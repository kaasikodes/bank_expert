export const NoteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.25 12C2.25 13.2426 3.25736 14.25 4.5 14.25H10.7485C11.0513 14.25 11.3438 14.1401 11.5717 13.9407L14.3231 11.5332C14.5944 11.2958 14.75 10.9529 14.75 10.5925V4C14.75 2.75736 13.7426 1.75 12.5 1.75H4.5C3.25736 1.75 2.25 2.75736 2.25 4V12Z"
        stroke="#5E5ADB"
        stroke-width="1.5"
      />
      <path d="M5.75 6.5H11.25" stroke="#5E5ADB" stroke-width="1.5" stroke-linecap="round" />
      <path d="M5.75 9.5H9.25" stroke="#5E5ADB" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  );
};
