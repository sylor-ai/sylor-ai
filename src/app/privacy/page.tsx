export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 text-white">
      <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
      <p className="text-sm text-white/60 mb-6">Last updated {new Date().toISOString().slice(0,10)}</p>
      <div className="space-y-4 text-sm text-white/75">
        <p>
          Sylor AI collects and processes information you provide to deliver our services: account
          details, messages sent via Twilio, and billing information. We never sell your data.
        </p>
        <p>
          Data is stored in Firebase/Firestore, with authentication by Firebase Auth. SMS is delivered via Twilio;
          payment processing is handled by Stripe. Emails are sent via Resend. Each providers security practices apply.
        </p>
        <p>
          You may request deletion of your account and associated tenant data at any time from Settings.
        </p>
        <p>
          Contact: privacy@sylor.ai
        </p>
      </div>
    </div>
  );
}

