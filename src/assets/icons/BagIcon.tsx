type Props = { size?: number; className?: string }

export default function BagIcon({ size = 18, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4706 1.32031H6.76471V5.08502H3V17.3203H15.2353V5.08502H11.4706V1.32031ZM10.5294 6.0262V8.37914H11.4706V6.0262H14.2941V16.3791H3.94118V6.0262H6.76471V8.37914H7.70588V6.0262H10.5294ZM10.5294 5.08502V2.26149H7.70588V5.08502H10.5294Z"
        fill="black"
      />
    </svg>
  )
}
