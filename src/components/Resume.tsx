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
    { category: 'Finance & Fintech', items: ['Financial Modeling', 'Fintech UX & Products', 'Accounting Integration', 'Investment Analysis', 'General Ledger Reconciliation'] },
    { category: 'Operations & Software', items: ['Microsoft Excel (Advanced)', 'Microsoft Office Systems', 'HR Payroll Systems', 'Automated Email Campaigns', 'Workflow Optimization'] },
    { category: 'Marketing & Design', items: ['Digital Marketing', 'Adobe Illustrator', 'Prompt Engineering', 'Brand Identity Systems', 'Social Media Campaigns'] },
  ];

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-transparent" id="resume">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16 no-print">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#00E5FF]/5 px-3 py-1.5 text-xs font-mono font-bold text-[#00E5FF] mb-4 border border-[#00E5FF]/20">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-white sm:text-4xl" id="resume-section-title">
            Professional Resume
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-xs sm:text-sm">
            Review qualifications, software proficiencies, and educational background. Click Print/Download below to export an A4 print-optimized PDF resume.
          </p>

          {/* Action Trigger */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handlePrintResume}
              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-xs font-mono uppercase tracking-wider font-bold text-black px-6 py-3.5 shadow-md shadow-[#00E5FF]/20 transition-all cursor-pointer hover:opacity-90 leading-none"
              id="download-resume-pdf-btn"
            >
              <FileDown className="h-4.5 w-4.5 text-black" />
              <span>Export & Save PDF Resume</span>
            </button>

            <button
              onClick={handlePrintResume}
              className="inline-flex items-center space-x-2 rounded-xl bg-[#111827] border border-zinc-800 hover:border-[#00E5FF]/40 text-xs font-mono uppercase tracking-wider font-bold text-zinc-350 px-5 py-3.5 transition-colors cursor-pointer leading-none"
              id="print-resume-btn"
            >
              <Printer className="h-4.5 w-4.5 text-[#00E5FF]" />
              <span>Direct Print</span>
            </button>
          </div>
        </div>

        {/* Printable Paper Sheet */}
        <div
          className="rounded-2xl border border-zinc-800 bg-[#111827]/30 backdrop-blur-md p-6 sm:p-10 md:p-14 text-left shadow-2xl relative overflow-hidden print:bg-white print:text-zinc-950 print:border-none print:p-0 print:shadow-none"
          id="resume-printable-sheet"
        >
          {/* Decorative Corner Glowing Badge */}
          <div className="absolute top-0 right-0 h-44 w-44 bg-[#00E5FF]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none print:hidden animate-pulse" />

          {/* Header block (A4 top) */}
          <div className="border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 print:border-zinc-200">
            <div>
              <h3 className="text-3xl font-display font-extrabold tracking-tight text-white print:text-zinc-900">
                {profile.name}
              </h3>
              <p className="text-[#00E5FF] font-bold font-mono text-xs uppercase tracking-wider mt-1.5 print:text-indigo-600">
                {profile.title}
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm mt-4 max-w-xl leading-relaxed print:text-zinc-650">
                {profile.bio}
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-500 space-y-2 flex-shrink-0 md:text-right print:text-zinc-600">
              <p className="flex items-center md:justify-end gap-2 text-zinc-400 print:text-zinc-750">
                <span>Email Sefat:</span>
                <a href={`mailto:${profile.email}`} className="text-[#00E5FF] font-bold print:text-[#00E5FF]">
                  {profile.email}
                </a>
              </p>
              <p className="text-zinc-400 print:text-zinc-750">
                <span>Google Site:</span>
                <a
                  href={`https://${profile.googleSiteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#00E5FF] font-bold ml-1 print:text-[#00E5FF]"
                >
                  {profile.googleSiteUrl}
                </a>
              </p>
              <p className="text-zinc-400 print:text-zinc-650">Primary Location: Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="py-8 border-b border-zinc-800 print:border-zinc-200">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C4DFF] mb-6 flex items-center gap-2 print:text-indigo-650">
              <Sparkles className="h-4 w-4 text-[#00E5FF]" />
              <span>Core Matrix & Skill Set</span>
            </h4>
            <div className="grid gap-6 sm:grid-cols-3">
              {skills.map((skillGroup, groupIdx) => (
                <div key={groupIdx} className="space-y-3">
                  <h5 className="text-xs font-mono font-bold text-white print:text-zinc-900 uppercase tracking-wider">
                    {skillGroup.category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-start">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="rounded bg-[#0A0A0A] px-2.5 py-1 text-xs font-mono text-zinc-400 border border-zinc-800 print:bg-zinc-100 print:text-zinc-800 print:border-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Body Columns (Experience & Education) */}
          <div className="grid gap-8 pt-8 md:grid-cols-3 border-b border-zinc-800 pb-8 print:border-zinc-200">
            {/* Left Col (Education & Accolades) */}
            <div className="md:col-span-1 space-y-8">
              {/* Education block */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C4DFF] mb-5 flex items-center gap-2 print:text-indigo-655">
                  <GraduationCap className="h-4 w-4 text-[#00E5FF]" />
                  <span>Education</span>
                </h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#00E5FF] pl-4 py-0.5 print:border-indigo-600">
                    <h5 className="text-sm font-display font-bold text-white print:text-zinc-900">
                      Bachelor of Business Administration (BBA)
                    </h5>
                    <p className="text-xs font-mono font-bold text-[#00E5FF] mt-0.5">
                      Major in Finance
                    </p>
                    <p className="text-xs font-semibold text-zinc-400 mt-1 print:text-zinc-650">
                      Daffodil International University (DIU)
                    </p>
                    <p className="text-[10px] font-mono text-zinc-550 mt-1">GPA: 3.94 / 4.00</p>
                  </div>

                  <div className="border-l-2 border-zinc-800 pl-4 py-0.5 print:border-zinc-300">
                    <h5 className="text-sm font-display font-medium text-zinc-300 print:text-zinc-800">
                      Higher Secondary Certificate (HSC)
                    </h5>
                    <p className="text-xs font-semibold text-zinc-400 mt-1 print:text-zinc-655">
                      B.A.F Shaheen College, Tejgaon
                    </p>
                    <p className="text-[10px] font-mono text-zinc-550 mt-1">Business Studies | GPA: 4.75 | 2022</p>
                  </div>

                  <div className="border-l-2 border-zinc-800 pl-4 py-0.5 print:border-zinc-300">
                    <h5 className="text-sm font-display font-medium text-zinc-300 print:text-zinc-800">
                      Secondary School Certificate (SSC)
                    </h5>
                    <p className="text-xs font-semibold text-zinc-400 mt-1 print:text-zinc-655">
                      Morning Glory School & College
                    </p>
                    <p className="text-[10px] font-mono text-zinc-550 mt-1">Business Studies | GPA: 4.11 | 2020</p>
                  </div>
                </div>
              </div>

              {/* Verified Badge info */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C4DFF] mb-5 flex items-center gap-2 print:text-indigo-655">
                  <Award className="h-4 w-4 text-[#00E5FF]" />
                  <span>Accreditation</span>
                </h4>
                <ul className="space-y-3 pl-1 text-xs text-zinc-400 print:text-zinc-700 font-mono">
                  <li className="flex items-start">
                    <CheckSquare className="h-3.5 w-3.5 text-[#00E5FF] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Adobe Illustrator Certified (HRDI)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare className="h-3.5 w-3.5 text-[#00E5FF] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Cyber Security (Mukhtopaath.gov.bd)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare className="h-3.5 w-3.5 text-[#00E5FF] mr-2 mt-0.5 flex-shrink-0" />
                    <span>AI+ Prompt Engineer (Netcom Learning)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Col (Experience Nodes summary) */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C4DFF] mb-5 flex items-center gap-2 print:text-indigo-655">
                  <Printer className="h-4 w-4 rotate-180 text-[#00E5FF]" />
                  <span>Professional Work History</span>
                </h4>
                <div className="space-y-6">
                  {experience.map((item) => (
                    <div key={item.id} className="border-l-2 border-zinc-800 pl-4 py-0.5 print:border-zinc-300">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <h5 className="text-sm font-display font-bold text-white print:text-zinc-900">
                          {item.role}
                        </h5>
                        <span className="text-[10px] font-mono font-bold text-[#00E5FF] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 print:bg-zinc-100 print:text-zinc-700 print:border-none">
                          {item.platform}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {item.clientName} | {item.duration}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {item.achievements.slice(0, 2).map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-xs text-zinc-500 leading-relaxed print:text-zinc-650">
                            <span className="text-[#00E5FF] mr-2 font-bold">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {experience.length === 0 && (
                    <p className="text-xs text-zinc-650 font-mono">No work experience loaded.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* References Section */}
          <div className="pt-8 block">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C4DFF] mb-6 flex items-center gap-2 print:text-indigo-655">
              <Award className="h-4 w-4 text-[#00E5FF]" />
              <span>Professional References</span>
            </h4>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-zinc-800 bg-[#0A0A0A]/50 rounded-xl p-5 print:border-zinc-250 print:bg-zinc-50">
                <h5 className="text-sm font-display font-bold text-white print:text-zinc-900">Dr. Md. Azizur Rahman</h5>
                <p className="text-xs text-zinc-400 mt-1">Associate Professor and Head</p>
                <p className="text-xs text-[#00E5FF] font-mono mt-1">Department of Business Administration</p>
                <p className="text-[11px] text-zinc-500 mt-2">Daffodil International University (DIU)</p>
                <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Cell: 01847334910</p>
              </div>

              <div className="border border-zinc-800 bg-[#0A0A0A]/50 rounded-xl p-5 print:border-zinc-250 print:bg-zinc-50">
                <h5 className="text-sm font-display font-bold text-white print:text-zinc-900">Engr. Md. Kamal Uddin</h5>
                <p className="text-xs text-zinc-400 mt-1">XEN Engineer</p>
                <p className="text-xs text-[#00E5FF] font-mono mt-1">Power Development Board (PDB)</p>
                <p className="text-[11px] text-zinc-500 mt-2">Dhaka, Bangladesh</p>
                <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Cell: 01719571688</p>
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
