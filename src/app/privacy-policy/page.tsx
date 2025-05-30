import React from 'react';

function PrivacyPolicy() {
  return (
    <main id='content' className='relative lg:px-40 md:px-20'>
      <div className='flex flex-col gap-4'>
        {/* Header */}
        <div className='bg-white sm:px-10 sm:py-5 py-3 px-5 flex justify-start'>
          <h1 className='sm:text-4xl text-2xl font-semibold'>
            Privacy Policy
          </h1>
        </div>

        {/* Content */}
        <div className='w-full sm:px-10 px-5 sm:pb-10 pb-5 flex flex-col gap-4 text-sm sm:text-base font-light'>
          <p>
            This Privacy Policy explains how G-Client Inc. ("we," "us," or "our") collects, uses, and protects your personal data when you use our learning platform ("Platform"). By using the Platform, you consent to the practices described below.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>1. Data We Collect</h2>
          <p>
            <strong>Account Data:</strong> Name, email, password (hashed), institution (if applicable).<br />
            <strong>Learning Data:</strong> Course progress, quiz scores, assignments, forum posts.<br />
            <strong>Technical Data:</strong> IP address, device type, browser, usage analytics (via cookies).<br />
            <strong>Payment Data:</strong> Processed securely by third-party providers (e.g., Stripe); we do not store full card details.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>2. How We Use Data</h2>
          <ul className="list-disc pl-5 gap-2 flex flex-col">
            <li>To provide and personalize courses.</li>
            <li>To track progress and certify completion.</li>
            <li>To respond to support requests.</li>
            <li>To improve Platform functionality (e.g., fix bugs).</li>
            <li>To send service updates (opt-out available).</li>
          </ul>

          <h2 className='font-bold text-base sm:text-lg'>3. Data Sharing</h2>
          <p>
            We <strong>do not sell</strong> your data. Limited sharing occurs with:
          </p>
          <ul className="list-disc pl-5 gap-2 flex flex-col">
            <li><strong>Instructors:</strong> For grading assignments or forum moderation.</li>
            <li><strong>Service Providers:</strong> Hosting, payment processors, analytics (under strict contracts).</li>
            <li><strong>Legal Compliance:</strong> If required by law (e.g., subpoena).</li>
          </ul>

          <h2 className='font-bold text-base sm:text-lg'>4. Data Security</h2>
          <p>
            We implement encryption (SSL/TLS), access controls, and regular audits. However, no system is 100% secure—promptly report suspicious activity to <a className='text-blue-400' href="mailto:security@g-client.com">security@g-client.com</a>.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>5. Your Rights</h2>
          <p>
            Depending on your location, you may:
          </p>
          <ul className="list-disc pl-5 gap-2 flex flex-col">
            <li>Access, correct, or delete your data via account settings.</li>
            <li>Export your learning history (e.g., certificates).</li>
            <li>Object to processing (e.g., marketing emails).</li>
            <li>Withdraw consent (where applicable).</li>
          </ul>
          <p>
            Submit requests to <a className='text-blue-400' href="mailto:privacy@g-client.com">privacy@g-client.com</a>.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>6. Children’s Privacy</h2>
          <p>
            The Platform is not designed for users under <strong>13</strong>. Schools/parents may contact us to manage accounts for minors in compliance with COPPA/FERPA.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>7. Cookies</h2>
          <p>
            We use cookies for login sessions and analytics. Disable them via browser settings, but some features may not work.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>8. Changes to This Policy</h2>
          <p>
            Updates will be posted here. Material changes (e.g., new data uses) will trigger email notifications.
          </p>

          <h2 className='font-bold text-base sm:text-lg'>9. Contact</h2>
          <p>
            Questions? Email <a className='text-blue-400' href="mailto:privacy@g-client.com">privacy@g-client.com</a> or mail:<br />
            G-Client Inc.<br />
            [Your Physical Address]<br />
            Attn: Data Protection Officer
          </p>

          <p className='italic'>
            Effective: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;