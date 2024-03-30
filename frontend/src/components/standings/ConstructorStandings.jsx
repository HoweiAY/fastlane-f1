import LoadingSpinner from "../common/LoadingSpinner";

const ConstructorStandings = ({constructorStandings}) => {
    const standingsColumns = ["Position", "Team", "Nationality", "Wins", "Points"];

    return (
        constructorStandings ? (
            <table className="table-fixed m-auto w-[95%] min-w-[50rem] text-left">
                <thead className="font-f1-b">
                    <tr>
                        {standingsColumns.map((columnText) => (
                            <th className="py-2">{columnText}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className=" [&>*:nth-child(even)]:bg-white text-sm">
                    {constructorStandings.map((team) => (
                        <tr 
                            key={team.Constructor.constructorId}
                            className="h-10 text-gray-800"
                        >
                            <td className="ps-2">{team.position}</td>
                            <td>{team.Constructor.name}</td>
                            <td>{team.Constructor.nationality}</td>
                            <td>{team.wins}</td>
                            <td className="pe-2">{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div className="flex flex-row justify-center items-center w-auto h-60 max-md:h-40">
                <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"}/>
            </div>
        )
    )
};

export default ConstructorStandings;