import ProgressBar from "../components/ProgressBar"
import WordDisplay from "../components/WordDisplay"

const BattleTypePage = () => {
  return (
    <div className="h-screen w-full flex relative bg-gray-100">
      <ProgressBar ratio={50}/>
      <WordDisplay word="CREATE" typed={"CRE"} ratio={50} />
    </div>
  )
}

export default BattleTypePage