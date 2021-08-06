import { ReactComponent as Gryffindor } from "../../images/Gryffindor.svg";
import { ReactComponent as Slytherin } from "../../images/Slytherin.svg";
import { ReactComponent as Hufflepuff } from "../../images/Hufflepuff.svg";
import { ReactComponent as Ravenclaw } from "../../images/Ravenclaw.svg";
import { ReactComponent as SortingHat } from "../../images/sorting-hat.svg";

export default function Theme() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <SortingHat fill="" className="w-20 h-20" />
      <p className="text-customGray text-sm tracking-wide">Choose your house</p>
      <div className="grid grid-cols-2 grid-rows-2 gap-1">
        <Gryffindor className="w-32 h-32 hover:bg-gray-200" fill="#E63E2D" />
        <Slytherin className="w-32 h-32 hover:bg-gray-200" fill="#1C5B4C" />
        <Hufflepuff className="w-32 h-32 hover:bg-gray-200" fill="#CCB750" />
        <Ravenclaw className="w-32 h-32 hover:bg-gray-200" fill="#021A26" />
      </div>
    </div>
  );
}
