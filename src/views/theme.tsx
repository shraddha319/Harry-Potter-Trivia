import { ReactComponent as Gryffindor } from '../images/Gryffindor.svg';
import { ReactComponent as Slytherin } from '../images/Slytherin.svg';
import { ReactComponent as Hufflepuff } from '../images/Hufflepuff.svg';
import { ReactComponent as Ravenclaw } from '../images/Ravenclaw.svg';
import { ReactComponent as SortingHat } from '../images/sorting-hat.svg';
import { useQuiz } from '../contexts';

export default function Theme() {
  const {
    quiz: { theme },
    dispatchQuiz,
  } = useQuiz();

  function themeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      dispatchQuiz({
        type: 'SET_THEME',
        payload: { theme: e.target.id },
      });
      localStorage.setItem('theme', e.target.id);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-4 lg:space-y-8 p-2">
      <SortingHat
        fill="var(--clr-primary)"
        className="w-20 h-20 lg:w-24 lg:h-24"
      />
      <p className="text-sm lg:text-lg tracking-wide clr-primary">
        Choose your house
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-1">
        <label htmlFor="gryffindor">
          <input
            name="theme"
            type="radio"
            id="gryffindor"
            className="hidden"
            onChange={themeHandler}
          />
          <Gryffindor
            className={`w-32 h-32 p-2 rounded-2xl hover:bg-gray-300 ${
              theme === 'gryffindor' && 'bg-gray-300'
            }`}
            fill="#E63E2D"
          />
        </label>
        <label htmlFor="slytherin">
          <input
            name="theme"
            type="radio"
            id="slytherin"
            className="hidden"
            onChange={themeHandler}
          />
          <Slytherin
            className={`w-32 h-32 p-2 rounded-2xl hover:bg-gray-300 ${
              theme === 'slytherin' && 'bg-gray-300'
            }`}
            fill="#1C5B4C"
          />
        </label>
        <label htmlFor="hufflepuff">
          <input
            name="theme"
            type="radio"
            id="hufflepuff"
            className="hidden"
            onChange={themeHandler}
          />
          <Hufflepuff
            className={`w-32 h-32 p-2 rounded-2xl hover:bg-gray-300 ${
              theme === 'hufflepuff' && 'bg-gray-300'
            }`}
            fill="#CCB750"
          />
        </label>
        <label htmlFor="ravenclaw">
          <input
            name="theme"
            type="radio"
            id="ravenclaw"
            className="hidden"
            onChange={themeHandler}
          />
          <Ravenclaw
            className={`w-32 h-32 p-2 rounded-2xl hover:bg-gray-300 ${
              theme === 'ravenclaw' && 'bg-gray-300'
            }`}
            fill="#021A26"
          />
        </label>
      </div>
    </div>
  );
}
