import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    const calendlyToken = Deno.env.get('CALENDLY_ACCESS_TOKEN');

    if (!calendlyToken) {
      throw new Error('Calendly access token not configured');
    }

    const calendlyHeaders = {
      'Authorization': `Bearer ${calendlyToken}`,
      'Content-Type': 'application/json',
    };

    if (action === 'get_user') {
      // Get current user info
      const response = await fetch('https://api.calendly.com/users/me', {
        method: 'GET',
        headers: calendlyHeaders,
      });

      if (!response.ok) {
        throw new Error(`Calendly API error: ${response.status}`);
      }

      const userData = await response.json();
      return new Response(JSON.stringify(userData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_event_types') {
      // Get user's event types
      const userResponse = await fetch('https://api.calendly.com/users/me', {
        method: 'GET',
        headers: calendlyHeaders,
      });

      if (!userResponse.ok) {
        throw new Error(`Calendly API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      const userUri = userData.resource.uri;

      const eventTypesResponse = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
        method: 'GET',
        headers: calendlyHeaders,
      });

      if (!eventTypesResponse.ok) {
        throw new Error(`Calendly API error: ${eventTypesResponse.status}`);
      }

      const eventTypesData = await eventTypesResponse.json();
      return new Response(JSON.stringify(eventTypesData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'create_appointment') {
      // Save appointment request to database
      const { name, email, phone, message, preferred_date, preferred_time } = data;

      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
          name,
          email,
          phone,
          message,
          preferred_date,
          preferred_time,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to save appointment request');
      }

      // Send notification email (optional - you can implement this later)
      console.log('New appointment request:', appointment);

      return new Response(JSON.stringify({ 
        success: true, 
        appointment,
        message: 'Votre demande de rendez-vous a été enregistrée. Nous vous contacterons bientôt pour confirmer.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_availability') {
      // Get available time slots (this is a simplified version)
      const userResponse = await fetch('https://api.calendly.com/users/me', {
        method: 'GET',
        headers: calendlyHeaders,
      });

      if (!userResponse.ok) {
        throw new Error(`Calendly API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      const userUri = userData.resource.uri;

      // Get user's scheduling links
      const eventTypesResponse = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
        method: 'GET',
        headers: calendlyHeaders,
      });

      if (!eventTypesResponse.ok) {
        throw new Error(`Calendly API error: ${eventTypesResponse.status}`);
      }

      const eventTypesData = await eventTypesResponse.json();
      
      return new Response(JSON.stringify({ 
        user: userData.resource,
        event_types: eventTypesData.collection 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Action not supported');

  } catch (error) {
    console.error('Error in calendly-booking function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Une erreur est survenue lors de la gestion de votre demande.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});