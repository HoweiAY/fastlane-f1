import LoadingSpinner from "../common/LoadingSpinner";

const ConstructorStandings = ({constructorStandings}) => {
    const standingsColumns = ["Position", "Team", "Nationality", "Wins", "Points"];

    return (
        constructorStandings ? (
            <table className="table-fixed m-auto w-[95%] min-w-[50rem] text-left">
                <thead
                    key="table_head" 
                    className="font-f1-b"
                >
                    <tr key="title_col">
                        {standingsColumns.map((columnText) => (
                            <th key={columnText} className="py-2">
                                {columnText}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody 
                    key="table_body" 
                    className=" [&>*:nth-child(even)]:bg-white text-sm max-md:text-xs"
                >
                    {constructorStandings.map((team) => (
                        <tr 
                            key={team.Constructor.constructorId}
                            className="h-10 text-gray-800"
                        >
                            <td key={`${team.Constructor.constructorId}_pos`} className="ps-2">
                                {team.position}
                            </td>
                            <td key={`${team.Constructor.constructorId}_name`}>
                                {team.Constructor.name}
                            </td>
                            <td key={`${team.Constructor.constructorId}_nationality`}>
                                {team.Constructor.nationality}
                            </td>
                            <td key={`${team.Constructor.constructorId}_wins`}>
                                {team.wins}
                            </td>
                            <td key={`${team.Constructor.constructorId}_pts`} className="pe-2">
                                {team.points}
                            </td>
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