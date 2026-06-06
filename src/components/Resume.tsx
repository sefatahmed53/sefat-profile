/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileDown, GraduationCap, Award, CheckSquare, Sparkles, Printer } from 'lucide-react';
import { ProfileInfo, Project, FreelanceExperience } from '../types';

interface ResumeProps {
  profile: ProfileInfo;
  experience: FreelanceExperience[];
  projects: Project[];
}

export default function Resume({ profile, experience, projects }: ResumeProps) {
  const skills = [
    { category: 'Core & UI/UX Design', items: ['Figma Prototyping', 'User Research & Testing', 'Information Architecture', 'Wireframing', 'Interaction Design'] },
    { category: 'Visual & Graphic Design', items: ['Adobe Illustrator', 'Brand Identity Systems', 'Typography Design', 'Vector Illustration', 'Marketing Assets'] },
    { category: 'Web Technologies', items: ['Responsive Design', 'HTML5 / CSS3', 'Tailwind CSS', 'React Integration', 'Web Accessibility (WCAG)'] },
  ];

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="resume">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16 no-print">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-4 border border-indigo-500/20">
            <GrGraduationCap className="h-3.5 w-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" id="resume-section-title">
            Professional Resume
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-sm">
            Review qualifications, software proficiencies, and educational background. Click Print/Download below to export an A4 print-optimized PDF resume.
          </p>

          {/* Action Trigger */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handlePrintResume}
              className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white px-6 py-3 shadow-lg shadow-indigo-600/15 transition-all cursor-pointer"
              id="download-resume-pdf-btn"
            >
              <FileDown className="h-4 w-4" />
              <span>Export & Save PDF Resume</span>
            </button>

            <button
              onClick={handlePrintResume}
              className="inline-flex items-center space-x-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-805 hover:border-zinc-700 text-xs font-semibold text-zinc-300 px-5 py-3 transition-colors cursor-pointer"
              id="print-resume-btn"
            >
              <Printer className="h-4 w-4" />
              <span>Direct Print</span>
            </button>
          </div>
        </div>

        {/* Printable Paper Block */}
        <div
          className="rounded-2xl border border-zinc-850 bg-zinc-900/15 p-6 sm:p-10 md:p-14 text-left shadow-2xl relative overflow-hidden print:bg-white print:text-zinc-950 print:border-none print:p-0 print:shadow-none"
          id="resume-printable-sheet"
        >
          {/* Decorative Corner Badge */}
          <div className="absolute top-0 right-0 h-44 w-44 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none print:hidden" />

          {/* Header block (A4 top) */}
          <div className="border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 print:border-zinc-200">
            <div>
              <h3 className="text-3xl font-black tracking-tight text-white print:text-zinc-900">
                {profile.name}
              </h3>
              <p className="text-indigo-400 font-bold font-mono text-xs uppercase tracking-wider mt-1.5 print:text-indigo-600">
                {profile.title}
              </p>
              <p className="text-zinc-400 text-sm mt-4 max-w-xl leading-relaxed print:text-zinc-650">
                {profile.bio}
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-500 space-y-2 flex-shrink-0 md:text-right print:text-zinc-600">
              <p className="flex items-center md:justify-end gap-2 text-zinc-400 print:text-zinc-750">
                <span>Email:</span>
                <a href={`mailto:${profile.email}`} className="text-indigo-400 font-semibold print:text-indigo-750">
                  {profile.email}
                </a>
              </p>
              <p className="text-zinc-400 print:text-zinc-750">
                <span>Sites:</span>
                <a
                  href={profile.googleSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-zinc-300 ml-1.5 print:text-zinc-900"
                >
                  sites.google.com/diu.edu.bd/sefat1
                </a>
              </p>
              <p className="text-zinc-400 print:text-zinc-650">Location: Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="py-8 border-b border-zinc-800 print:border-zinc-200">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2 print:text-indigo-650">
              <Sparkles className="h-4 w-4" />
              <span>Core Matrix & Skill Set</span>
            </h4>
            <div className="grid gap-6 sm:grid-cols-3">
              {skills.map((skillGroup, groupIdx) => (
                <div key={groupIdx} className="space-y-3">
                  <h5 className="text-xs font-bold text-white print:text-zinc-900 uppercase tracking-wider">
                    {skillGroup.category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-start">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="rounded bg-zinc-950 px-2 py-1 text-xs font-mono text-zinc-400 border border-zinc-850 print:bg-zinc-100 print:text-zinc-800 print:border-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Body Columns (Experience & Ed) */}
          <div className="grid gap-8 pt-8 md:grid-cols-3">
            {/* Left Col (Education & Accolades) */}
            <div className="md:col-span-1 space-y-8">
              {/* Education block */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-5 flex items-center gap-2 print:text-indigo-650">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-indigo-500 pl-4 py-0.5 print:border-indigo-600">
                    <h5 className="text-sm font-bold text-white print:text-zinc-900">
                      B.Sc. in Computer Science & Engineering
                    </h5>
                    <p className="text-xs font-medium text-zinc-400 mt-1 print:text-zinc-650">
                      Dhaka International University (DIU)
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">2021 - 2025 (Expected)</p>
                  </div>
                </div>
              </div>

              {/* Verified Badge info */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-5 flex items-center gap-2 print:text-indigo-650">
                  <Award className="h-4 w-4" />
                  <span>Accreditation</span>
                </h4>
                <ul className="space-y-3 pl-1 text-xs text-zinc-400 print:text-zinc-700">
                  <li className="flex items-start">
                    <CheckSquare className="h-3.5 w-3.5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Google Professional UX Design Credentials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare className="h-3.5 w-3.5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Interaction Design Foundation Accredited</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Col (Dynamic Experience Nodes summary) */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-5 flex items-center gap-2 print:text-indigo-650">
                  <Printer className="h-4 w-4 rotate-180" />
                  <span>Professional Work History</span>
                </h4>
                <div className="space-y-6">
                  {experience.map((item) => (
                    <div key={item.id} className="border-l-2 border-zinc-800 pl-4 py-0.5 print:border-zinc-300">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <h5 className="text-sm font-bold text-white print:text-zinc-900">
                          {item.role}
                        </h5>
                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850 print:bg-zinc-100 print:text-zinc-700 print:border-none">
                          {item.platform}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 print:text-zinc-650">
                        {item.clientName} | {item.duration}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {item.achievements.slice(0, 2).map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-xs text-zinc-500 leading-relaxed print:text-zinc-650">
                            <span className="text-indigo-400 mr-2 print:text-indigo-600 font-bold">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styled print guidelines (CSS Inject style) */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-printable-sheet, #resume-printable-sheet * {
            visibility: visible;
          }
          #resume-printable-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: white !important;
            color: #0c0a09 !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0px !important;
            margin: 0px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// Custom simple hook helper for Graduation Icon
function GrGraduationCap(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 18.8v-4L2 13v6a1 1 0 0 0 1 1h3" />
      <path d="M12 22a4 4 0 0 0 4-4V14" />
    </svg>
  );
}
