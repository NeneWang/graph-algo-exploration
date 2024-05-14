import React from 'react'

function TableDisplayer({ tableData }) {

    /**
     * Expected format:
     * {
        "a": {
            "shortest_distance": 0,
            "prev_node": null
        },
        "b": {
            "shortest_distance": null,
            "prev_node": null
        },
        "c": {
            "shortest_distance": null,
            "prev_node": null
        },
        "d": {
            "shortest_distance": null,
            "prev_node": null
        },
        "e": {
            "shortest_distance": null,
            "prev_node": null
        }
    }
        */
    // Identify the cols features.

    let rowsKeys = []
    let colsKeys = []

    // eslint-disable-next-line eqeqeq
    if (tableData !== undefined && tableData !== null && Object.keys(tableData).length != 0) {
        // console.log('tableData', tableData, Object.keys(tableData).length)
        rowsKeys = Object.keys(tableData)
        colsKeys = Object.keys(tableData[rowsKeys[0]])
        // console.log('colsKeys', colsKeys)
        // console.log('tableData', tableData)
    }



    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th>
                            Node
                        </th>
                        {colsKeys?.map((colKey, index) => {
                            return <th key={index}>{colKey}</th>
                        })}
                    </tr>
                </thead>
                <tbody>


                    {rowsKeys?.map((rowKey, index) => {
                        return (
                            <tr key={index}>
                                <td>{rowKey}</td>
                                {colsKeys?.map((colKey, index) => {
                                    return <td key={index}>{tableData[rowKey][colKey]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </>


    )
}

export default TableDisplayer