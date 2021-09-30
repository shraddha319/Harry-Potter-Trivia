import { ReactComponent as Gryffindor } from '../images/Gryffindor.svg';
import { ReactComponent as Slytherin } from '../images/Slytherin.svg';
import { ReactComponent as Hufflepuff } from '../images/Hufflepuff.svg';
import { ReactComponent as Ravenclaw } from '../images/Ravenclaw.svg';
import { useQuiz } from '../contexts';

export default function HouseIcon() {
  const {
    quiz: { theme },
  } = useQuiz();

  switch (theme) {
    case 'slytherin':
      return (
        <Slytherin className="w-32 h-32 hover:bg-gray-200" fill="#1C5B4C" />
      );

    case 'hufflepuff':
      return (
        <Hufflepuff className="w-32 h-32 hover:bg-gray-200" fill="#CCB750" />
      );

    case 'ravenclaw':
      return (
        <Ravenclaw className="w-32 h-32 hover:bg-gray-200" fill="#021A26" />
      );

    case 'gryffindor':
    default:
      return (
        <Gryffindor className="w-32 h-32 hover:bg-gray-200" fill="#E63E2D" />
      );
  }
}
