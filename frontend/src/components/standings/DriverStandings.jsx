import LoadingSpinner from "../common/LoadingSpinner";

const DriverStandings = ({driverStandings}) => {
    const standingsColumns = ["Position", "Driver", "No.", "Nationality", "Team", "Points"];

    return (
        driverStandings ? (
            <table className="table-fixed m-auto w-[95%] min-w-[60rem] text-left">
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
                    className=" [&>*:nth-child(even)]:bg-white text-sm"
                >
                    {driverStandings.map((driver) => (
                        <tr 
                            key={driver.Driver.permanentNumber} 
                            className="h-10 text-gray-800"
                        >
                            <td key={`${driver.Driver.permanentNumber}_pos`} className="ps-2">
                                {driver.position}
                            </td>
                            <td key={`${driver.Driver.permanentNumber}_name`}>
                                {`${driver.Driver.givenName} ${driver.Driver.familyName}`}
                            </td>
                            <td key={`${driver.Driver.permanentNumber}_num`}>
                                {driver.Driver.permanentNumber === "33" ? "1" : driver.Driver.permanentNumber}
                            </td>
                            <td key={`${driver.Driver.permanentNumber}_nationality`}>
                                {driver.Driver.nationality}
                            </td>
                            <td key={`${driver.Driver.permanentNumber}_team`}>
                                {driver.Constructors[0]?.name}
                            </td>
                            <td key={`${driver.Driver.permanentNumber}_pts`} className="pe-2">
                                {driver.points}
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

export default DriverStandings;