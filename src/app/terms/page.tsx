export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 text-white">
      <h1 className="text-2xl font-semibold mb-2">Terms of Service</h1>
      <p className="text-sm text-white/60 mb-6">Last updated {new Date().toISOString().slice(0,10)}</p>
      <div className="space-y-4 text-sm text-white/75">
        <p>
          By using Sylor AI you agree to comply with these terms and all applicable laws. You are responsible for
          the content of messages sent via the platform. Do not use Sylor AI for spam or unlawful activity.
        </p>
        <p>
          Sylor AI is provided as is without warranty. We limit liability to the maximum extent permitted by law.
        </p>
        <p>
          Billing is handled by Stripe; subscriptions renew until cancelled. You can cancel anytime from Billing.
        </p>
        <p>
          Contact: legal@sylor.ai
        </p>
      </div>
    </div>
  );
}

