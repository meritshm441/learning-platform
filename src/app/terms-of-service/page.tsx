import React from "react";

function Terms() {
  return (
    <main id="content" className="relative lg:px-40 md:px-20">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="bg-white sm:px-10 sm:py-5 py-3 px-5 flex justify-start">
          <h1 className="sm:text-4xl text-2xl font-semibold">
            Terms of Service
          </h1>
        </div>

        {/* Content */}
        <div className="w-full sm:px-10 px-5 sm:pb-10 pb-5 flex flex-col gap-4 text-sm sm:text-base font-light">
          <p>
            These Terms of Service ("Terms") govern your use of the G-Client
            learning platform ("Platform") operated by G-Client Inc. ("we,"
            "us," or "our"). By accessing or using the Platform, you agree to
            comply with these Terms. If you do not agree, please refrain from
            using the Platform.
          </p>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be posted on this page with an updated "Last Modified" date. Your
            continued use of the Platform after changes constitutes acceptance.
          </p>

          <h2 className="font-bold text-base sm:text-lg">
            1. ACCOUNT REGISTRATION
          </h2>
          <p>
            To access certain features, you must register an account. You agree
            to provide accurate information and keep your login credentials
            confidential. Notify us immediately of unauthorized account activity
            at{" "}
            <a className="text-blue-400" href="mailto:support@g-client.com">
              support@g-client.com
            </a>
            .
          </p>
          <p>
            Accounts are non-transferable. We may suspend or terminate accounts
            violating these Terms.
          </p>

          <h2 className="font-bold text-base sm:text-lg">2. PLATFORM USE</h2>
          <p>G-Client is for educational purposes only. You agree not to:</p>
          <ul className="list-disc pl-5 gap-2 flex flex-col">
            <li>Share copyrighted course materials without permission.</li>
            <li>
              Use automated tools to scrape content or disrupt Platform
              operations.
            </li>
            <li>Harass other users or post harmful/illegal content.</li>
            <li>Impersonate others or misrepresent affiliations.</li>
          </ul>

          <h2 className="font-bold text-base sm:text-lg">
            3. INTELLECTUAL PROPERTY
          </h2>
          <p>
            All Platform content (courses, text, graphics, logos) is owned by
            G-Client or licensors. You may access materials for personal use
            only. Redistribution or commercial use requires written permission.
          </p>

          <h2 className="font-bold text-base sm:text-lg">
            4. USER SUBMISSIONS
          </h2>
          <p>
            By submitting assignments, forum posts, or feedback ("Submissions"),
            you grant G-Client a license to use, display, and modify them for
            Platform operations. You confirm Submissions do not violate
            third-party rights.
          </p>

          <h2 className="font-bold text-base sm:text-lg">
            5. PAYMENTS & REFUNDS
          </h2>
          <p>
            Paid courses require upfront payment. Refund policies are outlined
            at checkout. Chargebacks may result in account suspension.
          </p>

          <h2 className="font-bold text-base sm:text-lg">6. DISCLAIMERS</h2>
          <p>
            The Platform is provided "as is." We do not guarantee uninterrupted
            access or accuracy of content. Course outcomes depend on individual
            effort.
          </p>

          <h2 className="font-bold text-base sm:text-lg">
            7. LIMITATION OF LIABILITY
          </h2>
          <p>
            G-Client is not liable for indirect damages (e.g., lost profits)
            arising from Platform use. Total liability is limited to fees paid
            by you in the past 12 months.
          </p>

          <h2 className="font-bold text-base sm:text-lg">8. TERMINATION</h2>
          <p>
            We may terminate accounts for violations without refund. You may
            delete your account anytime via settings.
          </p>

          <h2 className="font-bold text-base sm:text-lg">9. GOVERNING LAW</h2>
          <p>
            These Terms are governed by the laws of [Jurisdiction]. Disputes
            will be resolved in courts located in [Jurisdiction].
          </p>

          <h2 className="font-bold text-base sm:text-lg">10. CONTACT</h2>
          <p>
            Questions? Email{" "}
            <a className="text-blue-400" href="mailto:support@g-client.com">
              support@g-client.com
            </a>
            .
          </p>
          <p className="italic">
            Last Modified: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Terms;
