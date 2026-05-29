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

const TermsPage = () => {
  return (
    <>
      <Helmet><title>Terms &amp; Conditions — PaddlesPK</title></Helmet>
      <Header />
      <main className="min-h-screen bg-[#0a1628] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-3">Terms &amp; Conditions</h1>
            <p className="text-slate-400 text-sm">Last updated: May 2025 &nbsp;·&nbsp; Governing Law: Islamic Republic of Pakistan</p>
            <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl text-sm text-orange-300">
              These Terms &amp; Conditions govern the relationship between PaddlesPK and all users — including players, arena owners, and business partners. Please read them carefully.
            </div>
          </div>

          <Section number={1} title="Introduction">
            <p>
              Welcome to PaddlesPK. These Terms &amp; Conditions ("Terms") constitute a legally binding agreement between you and PaddlesPK ("we", "our", "us") governing your use of our platform, services, and any associated features. By accessing PaddlesPK or creating an account, you agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you must immediately stop using our services.
            </p>
          </Section>

          <Section number={2} title="About PaddlesPK">
            <p>
              PaddlesPK is Pakistan's premier padel court booking and arena management platform. We connect players with padel arenas across Pakistan, enabling seamless court discovery, online booking, and community engagement. PaddlesPK acts as an intermediary platform — we do not own or operate the arenas listed on our platform.
            </p>
          </Section>

          <Section number={3} title="Eligibility">
            <p>
              To use PaddlesPK, you must:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Be at least 18 years of age (or have parental/guardian consent if under 18).</li>
              <li>Have the legal authority to enter into binding agreements under Pakistani law.</li>
              <li>Provide accurate and truthful registration information.</li>
              <li>Not be barred from using our services under applicable law.</li>
            </ul>
            <p>
              Arena owners registering a business must have the legal authority to represent that business and enter into agreements on its behalf.
            </p>
          </Section>

          <Section number={4} title="Account Registration">
            <p>
              You must create an account to access certain features of PaddlesPK. When registering, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Provide accurate, complete, and current information.</li>
              <li>Keep your login credentials confidential and not share them with others.</li>
              <li>Notify us immediately of any unauthorised use of your account.</li>
              <li>Accept responsibility for all activities that occur under your account.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or harmful behaviour.
            </p>
          </Section>

          <Section number={5} title="Accuracy of Information">
            <p>
              You are responsible for ensuring that all information you provide — whether in your profile, arena listing, or booking — is accurate and up to date. PaddlesPK is not liable for any loss or inconvenience arising from inaccurate information submitted by users.
            </p>
          </Section>

          <Section number={6} title="Listing of Arenas">
            <p>
              Arena owners may apply to list their facilities on PaddlesPK. All listings are subject to review and approval by our team. By submitting a listing, arena owners confirm that:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All information provided about their arena is accurate and up to date.</li>
              <li>They have the legal right to operate and list the facility.</li>
              <li>The arena complies with all applicable Pakistani safety and business regulations.</li>
              <li>They agree to the commission and fee structure communicated by PaddlesPK.</li>
            </ul>
            <p>
              PaddlesPK reserves the right to reject, suspend, or remove any listing without prior notice if it violates our standards or these Terms.
            </p>
          </Section>

          <Section number={7} title="Booking Services">
            <p>
              PaddlesPK facilitates court bookings between players and arena owners. When you make a booking through our platform:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>A booking confirmation will be sent to your registered email and/or WhatsApp.</li>
              <li>The booking constitutes an agreement between you and the arena owner.</li>
              <li>PaddlesPK is not a party to the booking contract but facilitates the transaction.</li>
              <li>You must arrive at the arena on time and comply with the arena's rules and policies.</li>
            </ul>
          </Section>

          <Section number={8} title="Arena Owner Obligations">
            <p>
              Arena owners listed on PaddlesPK are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Maintaining accurate availability and pricing information on the platform.</li>
              <li>Honouring all confirmed bookings.</li>
              <li>Ensuring their courts are safe, clean, and in good working condition.</li>
              <li>Complying with all local laws, safety regulations, and fire codes.</li>
              <li>Treating all players with respect and without discrimination.</li>
              <li>Notifying PaddlesPK promptly of any operational changes or closures.</li>
            </ul>
          </Section>

          <Section number={9} title="Court Availability">
            <p>
              While we strive to ensure accurate availability data, PaddlesPK cannot guarantee real-time accuracy at all times. Court availability is subject to change by the arena owner. In the event of an overbooking or unexpected closure, the arena owner is responsible for communicating with affected players and offering alternative arrangements.
            </p>
          </Section>

          <Section number={10} title="Pricing and Fees">
            <p>
              Court prices displayed on PaddlesPK are set by the arena owners. PaddlesPK charges a platform commission on each booking, the details of which are communicated to arena owners separately.
            </p>
            <p>
              All prices displayed are in Pakistani Rupees (PKR) and are inclusive of applicable taxes unless stated otherwise. PaddlesPK reserves the right to update its commission structure with reasonable notice to arena owners.
            </p>
          </Section>

          <Section number={11} title="Payments">
            <p>
              PaddlesPK accepts payments via the following methods:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Online payment gateways (credit/debit cards)</li>
              <li>Bank transfers</li>
              <li>Mobile wallets (e.g., Easypaisa, JazzCash)</li>
            </ul>
            <p>
              All transactions are processed securely. PaddlesPK does not store raw payment card details. In the event of a failed transaction, please contact our support team at <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a>.
            </p>
          </Section>

          <Section number={12} title="WhatsApp Notifications">
            <p>
              By registering on PaddlesPK and providing your phone number, you consent to receiving WhatsApp messages from us relating to booking confirmations, reminders, and platform updates.
            </p>
            <p>
              You may opt out of non-essential notifications at any time by contacting our support team or messaging "STOP" via WhatsApp.
            </p>
          </Section>

          <Section number={13} title="Cancellations and Refunds">
            <p>
              Cancellation policies vary by arena and are displayed at the time of booking. Players are responsible for reviewing the cancellation policy before confirming a booking.
            </p>
            <p>
              PaddlesPK's general guidelines:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Cancellations made 24 hours or more before the booking time may be eligible for a full or partial refund, subject to the arena's policy.</li>
              <li>Cancellations made less than 24 hours before the booking time are generally non-refundable.</li>
              <li>No-shows are not eligible for refunds.</li>
              <li>If an arena cancels a booking, the player is entitled to a full refund.</li>
            </ul>
            <p>
              Refund disputes should be directed to <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a> for mediation.
            </p>
          </Section>

          <Section number={14} title="Reviews and Ratings">
            <p>
              Players may leave reviews and ratings for arenas they have visited. By submitting a review, you confirm that:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The review reflects your genuine experience.</li>
              <li>It does not contain false, defamatory, or misleading information.</li>
              <li>It does not violate any third party's rights or applicable law.</li>
            </ul>
            <p>
              PaddlesPK reserves the right to remove reviews that violate these standards without prior notice.
            </p>
          </Section>

          <Section number={15} title="Marketing and Promotional Rights">
            <p>
              By listing an arena on PaddlesPK, arena owners grant PaddlesPK a non-exclusive, royalty-free licence to use their arena's name, logo, photos, and information for marketing and promotional purposes across our platform, social media, and other channels.
            </p>
            <p>
              Arena owners may withdraw this consent by contacting us in writing, with such withdrawal taking effect within 30 days of receipt.
            </p>
          </Section>

          <Section number={16} title="Future Features">
            <p>
              PaddlesPK may introduce additional features and services in the future, including tournaments, coaching sessions, equipment rental, and a mobile application. Such features will be governed by these Terms unless separate terms are provided. We will notify users of material additions.
            </p>
          </Section>

          <Section number={17} title="Intellectual Property">
            <p>
              All content on PaddlesPK — including logos, text, graphics, software, and code — is the intellectual property of PaddlesPK or its licensors. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
            <p>
              Users retain ownership of content they submit (e.g., reviews, photos) but grant PaddlesPK a licence to use it as described in these Terms.
            </p>
          </Section>

          <Section number={18} title="Safety and Compliance">
            <p>
              Players are responsible for ensuring they are physically fit to participate in padel activities. PaddlesPK is not liable for any personal injury or property damage that occurs at an arena.
            </p>
            <p>
              Arena owners are responsible for compliance with all applicable health, safety, and building regulations. PaddlesPK does not inspect arenas and cannot guarantee their safety standards beyond the information provided in their listing.
            </p>
          </Section>

          <Section number={19} title="Limitation of Liability">
            <p>
              To the maximum extent permitted by Pakistani law, PaddlesPK shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Indirect, incidental, or consequential damages arising from use of our platform.</li>
              <li>Loss of revenue, data, or opportunity resulting from platform downtime or errors.</li>
              <li>Any act or omission of an arena owner, player, or third party.</li>
              <li>Losses arising from unauthorised access to your account.</li>
            </ul>
            <p>
              Our total liability to you shall not exceed the amount paid by you to PaddlesPK in the 3 months preceding the claim.
            </p>
          </Section>

          <Section number={20} title="Indemnification">
            <p>
              You agree to indemnify and hold harmless PaddlesPK, its officers, employees, and partners from any claims, damages, or expenses (including legal fees) arising from your use of the platform, violation of these Terms, or infringement of any third-party rights.
            </p>
          </Section>

          <Section number={21} title="Suspension and Termination">
            <p>
              PaddlesPK reserves the right to suspend or terminate any account, listing, or access to the platform at its discretion, including for:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Violation of these Terms or any applicable law.</li>
              <li>Fraudulent, abusive, or harmful behaviour.</li>
              <li>Non-payment of fees owed to PaddlesPK.</li>
              <li>Repeated negative reviews or complaints from players.</li>
            </ul>
            <p>
              We will endeavour to provide notice before suspension where possible, except in cases of serious misconduct.
            </p>
          </Section>

          <Section number={22} title="Force Majeure">
            <p>
              PaddlesPK shall not be liable for any failure to perform its obligations where such failure results from circumstances beyond our reasonable control, including natural disasters, government actions, civil unrest, power failures, internet outages, or pandemics.
            </p>
          </Section>

          <Section number={23} title="Governing Law and Dispute Resolution">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any disputes arising from these Terms or your use of PaddlesPK shall be subject to the exclusive jurisdiction of the courts of Pakistan.
            </p>
            <p>
              We encourage users to contact us first to resolve disputes informally at <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a> before pursuing formal legal action.
            </p>
          </Section>

          <Section number={24} title="Amendments">
            <p>
              PaddlesPK reserves the right to amend these Terms at any time. When we make material changes, we will notify registered users via email or a prominent notice on our website at least 7 days before the changes take effect.
            </p>
            <p>
              Your continued use of PaddlesPK after the effective date of any amendment constitutes your acceptance of the revised Terms. If you do not agree with the amended Terms, you must stop using our services.
            </p>
          </Section>

          <Section number={25} title="Contact Us">
            <p>
              For any questions, concerns, or legal notices relating to these Terms &amp; Conditions, please contact us:
            </p>
            <div className="bg-slate-800/50 rounded-xl p-5 mt-3 space-y-1">
              <p className="font-semibold text-white">PaddlesPK Legal &amp; Support Team</p>
              <p>Email: <a href="mailto:support@paddlespk.com" className="text-primary hover:underline">support@paddlespk.com</a></p>
              <p>WhatsApp: <a href="tel:03027799404" className="text-primary hover:underline">0302-7799404</a></p>
              <p>Website: <Link to="/" className="text-primary hover:underline">paddlespk.com</Link></p>
            </div>
          </Section>

          <div className="border-t border-slate-800 pt-8 mt-4">
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/support" className="hover:text-primary transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
