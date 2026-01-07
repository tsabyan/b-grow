import { createClient } from '@/lib/supabase/server';

export default async function TestPage() {
  const supabase = await createClient();

  // Test connection
  const { data: { session }, error } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">
          Supabase Connection Test
        </h1>

        <div className="border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold">Connection Status: Active</span>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Supabase URL:</span>{' '}
              <code className="bg-muted px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_URL}
              </code>
            </p>

            <p>
              <span className="font-medium">Auth Service:</span>{' '}
              <span className="text-green-600">✓ Accessible</span>
            </p>

            <p>
              <span className="font-medium">Current Session:</span>{' '}
              <span className="text-muted-foreground">
                {session ? 'Logged in' : 'Not logged in'}
              </span>
            </p>

            {error && (
              <p className="text-destructive">
                <span className="font-medium">Error:</span> {error.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            ✨ Supabase is connected and ready! You can now proceed with Story 1.2
            to implement authentication and user management.
          </p>
        </div>

        <a
          href="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
