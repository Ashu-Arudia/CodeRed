'use client';
import {
  Search,
  ChevronDown,
  LifeBuoy,
  FileText,
  UserCircle,
  Swords,
} from "lucide-react";
import { useState } from "react";
import { MessageSquare, HelpCircle, X } from "lucide-react";

// --- Types for placeholder data ---
type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  name: string;
  icon: React.ReactNode;
  faqs: FaqItem[];
};

// --- Placeholder Data ---
const faqData: FaqCategory[] = [
  {
    name: "Getting Started",
    icon: <FileText className="w-5 h-5 mr-2" />,
    faqs: [
      {
        question: "How do I join my first match?",
        answer:
          'Navigate to the "Home" page to see the "Available Arenas". Simply click on an arena like "1 v 1" and you will be entered into the matchmaking queue. Good luck!',
      },
      {
        question: "What are PTS (Points)?",
        answer:
          "PTS are your skill rating points. You gain points by winning ranked matches and lose them when you lose. Your point total determines your rank on the leaderboards.",
      },
    ],
  },
  {
    name: "Account & Profile",
    icon: <UserCircle className="w-5 h-5 mr-2" />,
    faqs: [
      {
        question: "How can I change my username or avatar?",
        answer:
          'You can update your username and upload a new avatar from the "Settings" page. Click on your profile icon in the top-right corner to access your settings.',
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer:
          'If you are logged out, you can click the "Forgot Password" link on the login screen. If you are logged in, you can change your password from the "Account Security" section in your settings.',
      },
    ],
  },
  {
    name: "Gameplay & Arenas",
    icon: <Swords className="w-5 h-5 mr-2" />,
    faqs: [
      {
        question: "What is the difference between Ranked and Unranked matches?",
        answer:
          "Ranked matches affect your PTS and your position on the global leaderboards. Unranked matches are for practice and do not affect your skill rating.",
      },
      {
        question: "How are tournaments structured?",
        answer:
          'Tournaments are elimination-style events with specific start times. You can register for upcoming tournaments on the "Tournaments" page. Prizes are awarded to the top performers.',
      },
    ],
  },
];

// --- Helper Components ---
const AccordionItem = ({ faq }: { faq: FaqItem }) => (
  <details className="group border-b border-zinc-700">
    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800 list-none">
      <span className="font-medium">{faq.question}</span>
      <ChevronDown className="w-5 h-5 text-zinc-400 transition-transform duration-300 group-open:rotate-180" />
    </summary>
    <div className="p-4 bg-zinc-900">
      <p className="text-zinc-300">{faq.answer}</p>
    </div>
  </details>
);

export default function HelpPage() {
  const [support, setShowSupport] = useState<Boolean>(false);
  const [inquiryType, setInquiryType] = useState<"feedback" | "help">(
    "feedback"
  );

  const showSupport = () => {
    setShowSupport(true);
  };
  const dontShowSupport = () => {
    setShowSupport(false);
  };
  return (
    <>
      <div className="bg-[#121212] text-white h-screen overflow-y-scroll p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <LifeBuoy className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold">How can we help?</h1>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
              Find answers to common questions, or reach out to our support team
              for more help.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search for a topic, like 'how to change password'"
              className="w-full bg-[#1E1E1E] border border-zinc-700 rounded-lg pl-12 pr-4 py-3.5 text-md text-white focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* FAQ Section */}
          <div className="space-y-10">
            {faqData.map((category) => (
              <div key={category.name}>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  {category.icon}
                  {category.name}
                </h2>
                <div className="bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden">
                  {category.faqs.map((faq) => (
                    <AccordionItem key={faq.question} faq={faq} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support Section */}
          <div className="text-center bg-[#1E1E1E] p-8 rounded-lg shadow-lg mt-16">
            <h2 className="text-2xl font-semibold">Can't find an answer?</h2>
            <p className="text-zinc-400 mt-2">
              Our support team is here to help you out.
            </p>
            <button
              onClick={showSupport}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {support && (
        <div className="absolute z-10 top-0 w-full h-full flex justify-center items-center">
          <div
            onClick={dontShowSupport}
            className="w-full h-full bg-black opacity-60"
          ></div>
          <div className="fixed w-1/2 flex z-20 ">
            <div className="bg-[#1E1E1E] text-white rounded-lg shadow-2xl w-full font-sans ">
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-zinc-700">
                <h2 className="text-xl font-bold">Contact Support</h2>
                <button
                  onClick={dontShowSupport}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {/* Inquiry Type Selector */}
                <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1 rounded-lg mb-6">
                  <button
                    onClick={() => setInquiryType("feedback")}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                      inquiryType === "feedback"
                        ? "bg-red-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <MessageSquare size={16} className="mr-2" /> Send Feedback
                    </div>
                  </button>
                  <button
                    onClick={() => setInquiryType("help")}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                      inquiryType === "help"
                        ? "bg-red-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <HelpCircle size={16} className="mr-2" /> Get Help
                    </div>
                  </button>
                </div>

                {/* Form Fields */}
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      placeholder={
                        inquiryType === "feedback"
                          ? "e.g., Suggestion for the UI"
                          : "e.g., Matchmaking Issue"
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      {inquiryType === "feedback"
                        ? "Your Feedback"
                        : "Describe your issue"}
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Please provide as much detail as possible..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:ring-red-500 focus:border-red-500 resize-none scrollbar-hide"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                <p className="text-xs text-zinc-500 text-center mt-4">
                  Our team typically responds within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
