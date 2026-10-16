export function Trolley(props) {
  return (
    <svg xmlns="http://w3.org" viewBox="0 0 200 200" {...props}>
      <path d="M 70,150 L 145,150" fill="none" stroke="#555555" strokeWidth="5" strokeLinecap="round"/>
      <path d="M 70,150 C 55,150 50,135 52,120 C 54,105 60,95 60,95" fill="none" stroke="#555555" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      
      <line x1="53" y1="115" x2="40" y2="72" stroke="#555555" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="38" cy="66" r="6" fill="#cc1111"/>

      <polygon points="58,72 165,72 148,130 62,130" fill="none" stroke="#666666" strokeWidth="3.5" strokeLinejoin="round"/>

      <line x1="79" y1="72" x2="79" y2="130" stroke="#777777" strokeWidth="1.5"/>
      <line x1="100" y1="72" x2="98" y2="130" stroke="#777777" strokeWidth="1.5"/>
      <line x1="121" y1="72" x2="116" y2="130" stroke="#777777" strokeWidth="1.5"/>
      <line x1="142" y1="72" x2="133" y2="130" stroke="#777777" strokeWidth="1.5"/>

      <line x1="56" y1="86" x2="161" y2="86" stroke="#777777" strokeWidth="1.5"/>
      <line x1="58" y1="101" x2="156" y2="101" stroke="#777777" strokeWidth="1.5"/>
      <line x1="60" y1="116" x2="152" y2="116" stroke="#777777" strokeWidth="1.5"/>

      <circle cx="70" cy="165" r="14" fill="#000000"/>
      <circle cx="70" cy="165" r="6" fill="#ffffff"/>
      <circle cx="70" cy="165" r="2.5" fill="#555555"/>

      <circle cx="145" cy="165" r="14" fill="#000000"/>
      <circle cx="145" cy="165" r="6" fill="#ffffff"/>
      <circle cx="145" cy="165" r="2.5" fill="#555555"/>
    </svg>
  );
};

export default Trolley;
