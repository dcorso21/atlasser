export function getPeriods(q = []) {
    let periods = [
        {
            name: "prehistory",
            startDate: -3000,
            endDate: -600,
            subPeriods: [
                {
                    name: "bronze age",
                    startDate: -3000,
                    endDate: -1300,
                    subPeriods: [
                        {
                            name: "age1",
                            startDate: -2500,
                            endDate: -2000,
                            subPeriods: [],
                        },
                        {
                            name: "age2",
                            startDate: -2000,
                            endDate: -1300,
                            subPeriods: [],
                        },
                    ],
                },
                {
                    name: "iron age",
                    startDate: -1300,
                    endDate: -600,
                    subPeriods: [],
                },
            ],
        },
        {
            name: "classical era",
            startDate: -600,
            endDate: 475,
            subPeriods: [
                {
                    name: "ancient greece",
                    startDate: -600,
                    endDate: 600,
                    subPeriods: [],
                },
                {
                    name: "ancient rome",
                    startDate: -753,
                    endDate: 476,
                    subPeriods: [],
                },
                {
                    name: "persian empire",
                    startDate: -550,
                    endDate: -330,
                    subPeriods: [],
                },
                {
                    name: "byzantine empire",
                    startDate: 285,
                    endDate: 1453,
                    subPeriods: [],
                },
            ],
        },
        {
            name: "middle ages",
            startDate: 476,
            endDate: 1450,
            subPeriods: [],
        },
    ];

    return periods;
}