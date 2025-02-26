import { supabase } from '@/lib/supabase-client';
import ko from '@/localization/ko.json';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useLocation } from 'react-router';

function SupaSignUpPage() {
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="p-4 w-100 bg-white">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        localization={{ variables: ko }}
      />
    </div>
  );
}

export default SupaSignUpPage;
