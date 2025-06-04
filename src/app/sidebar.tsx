// src/app/Sidebar.tsx
"use client";

import React from "react";

type SidebarProps = {
  // 各セクションのスクロールを司る関数を渡す
  onScrollToProfile: () => void;
  onScrollToEducation: () => void;
  onScrollToGrants: () => void;
  onScrollToPublications: () => void;
  onScrollToIntlConfs: () => void;
  onScrollToInvitedLectures: () => void;
  onScrollToDomPresentations: () => void;
  onScrollToOtherActivities: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  onScrollToProfile,
  onScrollToEducation,
  onScrollToGrants,
  onScrollToPublications,
  onScrollToIntlConfs,
  onScrollToInvitedLectures,
  onScrollToDomPresentations,
  onScrollToOtherActivities,
}) => {
  return (
    <nav
      className="
        fixed top-0 left-0 h-screen w-48 
        bg-gray-100 p-4 overflow-auto
        border-r border-gray-300
      "
    >
      <ul className="space-y-2 text-sm">
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToProfile}
          >
            Profile
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToEducation}
          >
            経歴
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToGrants}
          >
            Grants & Fellowships
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToPublications}
          >
            論文
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToIntlConfs}
          >
            国際学会
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToInvitedLectures}
          >
            招待講演（国内）
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToDomPresentations}
          >
            学会等発表（国内）
          </button>
        </li>
        <li>
          <button
            className="w-full text-left hover:text-blue-600"
            onClick={onScrollToOtherActivities}
          >
            Other Activities
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;