import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Section = ({ number, title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-white mb-3">
      {number}. {title}
    </h2>
    <div className="text-slate-300 leading-relaxed space-y-3">{children}</div>
  </section>
);

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet><title>Privacy Policy — PaddlesPK</title></Helmet>
      <Header />
      <main className="min-h-screen bg-[#0a1628] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: May 2025 &nbsp;·&nbsp; Effective immediately upon publication</p>
          </div>

          <Section number={1} title="Introduction">
            <p>
              Welcome to PaddlesPK ("we", "our", "us"). We are committed to protecting the personal information of everyone who uses our platform. This Privacy Policy explains how we collect, use, store, share, and protect your data when you interact with PaddlesPK in any capacity — as a player, an arena owner, a partner, or a visitor.
            </p>
            <p>
              By accessing or using PaddlesPK, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services.
            </p>
          </Section>

          <Section number={2} title="Scope of This Policy">
            <p>This Privacy Policy applies to all services operated by PaddlesPK, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Our website at paddlespk.com</li>
              <li>Our mobile application (when available)</li>
              <li>Court booking and scheduling services</li>
              <li>WhatsApp-based booking and support communications</li>
              <li>Email correspondence and newsletters</li>
              <li>Customer support channels</li>
              <li>Marketing and promotional campaigns</li>
              <li>Any future services or features we introduce</li>
            </ul>
          </Section>

          <Section number={3} title="Information We Collect">
            <p>We collect different categories of personal data depending on how you use our platform:</p>

            <div className="ml-2 space-y-4">
              <div>
                <h3 className="font-semibold text-white">3.1 Identity Information</h3>
                <p>Full name, username, date of birth, profile picture, and government-issued ID (where required for verification).</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.2 Contact Information</h3>
                <p>Email address, phone number (including WhatsApp), and postal address.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.3 Arena Information</h3>
                <p>For arena owners: business name, location (address and GPS coordinates), court specifications, operating hours, and pricing details.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.4 Financial Information</h3>
                <p>Payment method details (processed securely through our payment partners), transaction history, and subscription data. We do not store raw card details on our servers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.5 Booking Information</h3>
                <p>Court bookings made, dates and times, courts selected, booking history, and cancellations.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.6 Communication Data</h3>
                <p>Messages exchanged via our support channels, WhatsApp conversations relating to bookings, and feedback or reviews you submit.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.7 Technical Data</h3>
                <p>IP address, browser type and version, device identifiers, operating system, time zone, and pages visited on our website.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">3.8 Analytics Data</h3>
                <p>Usage patterns, click behaviour, session durations, features used, and referral sources — collected through analytics tools to improve our platform.</p>
              </div>
            </div>
          </Section>

          <Section number={4} title="Information We Collect from Players">
            <p>
              When you register as a player, we collect your name, email, phone number, and any profile information you choose to provide. When you make a booking, we additionally collect the details of that booking and your payment confirmation. We may also collect location data (with your permission) to show you nearby arenas.
            </p>
          </Section>

          <Section number={5} title="How We Use Your Information">
            <p>We use the data we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="text-white font-medium">5.1 Service Delivery:</span> To facilitate bookings, process payments, and provide platform features.</li>
              <li><span className="text-white font-medium">5.2 Account Management:</span> To create and manage your PaddlesPK account.</li>
              <li><span className="text-white font-medium">5.3 Communications:</span> To send booking confirmations, reminders, and important service updates.</li>
              <li><span className="text-white font-medium">5.4 Customer Support:</span> To respond to your enquiries, complaints, and support tickets.</li>
              <li><span className="text-white font-medium">5.5 Platform Improvement:</span> To analyse usage, fix bugs, and enhance our services.</li>
              <li><span className="text-white font-medium">5.6 Compliance:</span> To comply with applicable laws and regulations in Pakistan.</li>
              <li><span className="text-white font-medium">5.7 Safety:</span> To detect fraud, protect users, and ensure the security of our platform.</li>
            </ul>
          </Section>

          <Section number={6} title="WhatsApp Communications">
            <p>
              PaddlesPK may use WhatsApp Business to send booking confirmations, court reminders, and support messages. By providing your phone number, you consent to receiving WhatsApp messages from us. You may opt out at any time by messaging "STOP" or contacting our support team.
            </p>
            <p>
              We do not share your WhatsApp number with third parties for marketing purposes without your explicit consent.
            </p>
          </Section>

          <Section number={7} title="Marketing Communications">
            <p>
              With your consent, we may send you promotional emails, SMS messages, or WhatsApp notifications about new features, special offers, tournaments, and platform news.
            </p>
            <p>
              You can opt out of marketing communications at any time by clicking "Unsubscribe" in any email, messaging "STOP" via WhatsApp or SMS, or updating your preferences in your account settings. Opting out of marketing does not affect essential service communications.
            </p>
          </Section>

          <Section number={8} title="Sharing of Your Information">
            <p>We do not sell your personal data. We may share it only in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="text-white font-medium">8.1 Service Providers:</span> With trusted third-party vendors (e.g., payment processors, hosting providers, analytics tools) who process data on our behalf under strict data protection agreements.</li>
              <li><span className="text-white font-medium">8.2 Arena Owners:</span> Booking details (name, contact, booking time) may be shared with the arena owner to facilitate your reservation.</li>
              <li><span className="text-white font-medium">8.3 Legal Obligations:</span> If required by Pakistani law, court order, or government authority, we may disclose your information to comply with legal obligations.</li>
            </ul>
          </Section>

          <Section number={9} title="Cookies and Tracking Technologies">
            <p>
              We use cookies and similar technologies to maintain your session, remember your preferences, and analyse platform usage. You can control cookie settings in your browser. Disabling cookies may affect certain features of the platform.
            </p>
            <p>
              We use analytics cookies (e.g., Google Analytics or similar) to understand how users interact with our platform. This data is anonymised where possible.
            </p>
          </Section>

          <Section number={10} title="Data Retention">
            <p>
              We retain your personal data for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <p>
              When you close your account, we will delete or anonymise your personal data within 90 days, except where retention is required by law (e.g., financial records may be kept for 7 years as required under Pakistani tax law).
            </p>
          </Section>

          <Section number={11} title="Security">
            <p>
              We implement industry-standard security measures to protect your data, including HTTPS encryption, secure password hashing, access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure.
            </p>
            <p>
              In the event of a data breach that poses a significant risk to your rights, we will notify affected users and relevant authorities as required by applicable law.
            </p>
          </Section>

          <Section number={12} title="International Data Transfers">
            <p>
              PaddlesPK is based in Pakistan and primarily processes data within Pakistan. However, some of our service providers may process data in other countries. Where data is transferred outside Pakistan, we ensure appropriate safeguards are in place to protect your information.
            </p>
          </Section>

          <Section number={13} title="Arena Owner Responsibilities">
            <p>
              Arena owners who list their facilities on PaddlesPK are responsible for handling player data in compliance with applicable privacy laws. PaddlesPK provides booking data to arena owners solely for the purpose of facilitating reservations. Arena owners must not use this data for any other purpose without the player's consent.
            </p>
          </Section>

          <Section number={14} title="Children's Privacy">
            <p>
              PaddlesPK is intended for users aged 16 and above. We do not knowingly collect personal data from children under 16. If you believe a child has provided us with their data, please contact us at <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a> and we will take immediate steps to delete it.
            </p>
          </Section>

          <Section number={15} title="Your Privacy Rights">
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="text-white font-medium">Access:</span> Request a copy of the personal data we hold about you.</li>
              <li><span className="text-white font-medium">Correction:</span> Request that we correct inaccurate or incomplete data.</li>
              <li><span className="text-white font-medium">Deletion:</span> Request deletion of your personal data (subject to legal obligations).</li>
              <li><span className="text-white font-medium">Objection:</span> Object to certain processing activities, including direct marketing.</li>
              <li><span className="text-white font-medium">Portability:</span> Request a copy of your data in a machine-readable format.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a>.</p>
          </Section>

          <Section number={16} title="Account Closure">
            <p>
              You may close your PaddlesPK account at any time by contacting our support team. Upon closure, we will deactivate your account and schedule your personal data for deletion in accordance with our retention policy (Section 10). Any outstanding bookings or obligations must be resolved prior to account closure.
            </p>
          </Section>

          <Section number={17} title="Third-Party Links">
            <p>
              Our platform may contain links to third-party websites (e.g., arena websites, social media). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal data.
            </p>
          </Section>

          <Section number={18} title="Future Services">
            <p>
              As PaddlesPK grows, we may introduce new features such as tournaments, coaching, equipment rental, and a mobile application. This Privacy Policy will be updated to reflect how we handle data in connection with those new services. We will notify users of material changes.
            </p>
          </Section>

          <Section number={19} title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we make significant changes, we will notify you via email or a prominent notice on our website prior to the change taking effect. The "Last updated" date at the top of this page reflects the most recent revision.
            </p>
            <p>
              Your continued use of PaddlesPK after any changes constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section number={20} title="Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-800/50 rounded-xl p-5 mt-3 space-y-1">
              <p className="font-semibold text-white">PaddlesPK Support Team</p>
              <p>Email: <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a></p>
              <p>WhatsApp: <a href="tel:03027799404" className="text-primary hover:underline">0302-7799404</a></p>
              <p>Website: <Link to="/" className="text-primary hover:underline">paddlespk.com</Link></p>
            </div>
          </Section>

          <div className="border-t border-slate-800 pt-8 mt-4">
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link>
              <Link to="/support" className="hover:text-primary transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
