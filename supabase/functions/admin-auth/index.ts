import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, password, submissionId, status, rejectionReason } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (action === 'login') {
      // Check admin password
      const { data: settings, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'admin_password')
        .single()

      if (error || !settings) {
        console.error('Error fetching admin password:', error)
        return new Response(
          JSON.stringify({ success: false, error: 'Authentication failed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      if (settings.setting_value === password) {
        // Generate a simple session token (in production, use proper JWT)
        const token = crypto.randomUUID()
        return new Response(
          JSON.stringify({ success: true, token }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } else {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid password' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }
    }

    if (action === 'get-submissions') {
      const { data: submissions, error } = await supabase
        .from('property_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching submissions:', error)
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to fetch submissions' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      return new Response(
        JSON.stringify({ success: true, submissions }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'update-status') {
      const updateData: Record<string, unknown> = {
        status,
        reviewed_at: new Date().toISOString(),
      }

      if (status === 'rejected' && rejectionReason) {
        updateData.rejection_reason = rejectionReason
      }

      const { error } = await supabase
        .from('property_submissions')
        .update(updateData)
        .eq('id', submissionId)

      if (error) {
        console.error('Error updating submission:', error)
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to update submission' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})