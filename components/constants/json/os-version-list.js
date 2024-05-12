const osVersionList = [
    { 
        title: "ANDROID",
        key: "ALL.ANDROID",
        children: [
            { 
                title: "2.0", 
                key: "A.2.0", 
                children: [{ title: "2.0.0", key: "A.2.0.0" }, { title: "2.2.0", key: "A.2.2.0" }, { title: "2.2.1", key: "A.2.2.1" }, { title: "2.3.3", key: "A.2.3.3" }, { title: "2.3.6", key: "A.2.3.6" }]},
            { 
                title: "4.0", 
                key: "A.4.0",
                children: [
                    { title: "4.0.0", key: "A.4.0.0" },
                    { title: "4.0.3", key: "A.4.0.3" },
                    { title: "4.0.4", key: "A.4.0.4" },
                    { title: "4.1.0", key: "A.4.1.0" },
                    { title: "4.1.1", key: "A.4.1.1" },
                    { title: "4.1.2", key: "A.4.1.2" },
                    { title: "4.2.0", key: "A.4.2.0" },
                    { title: "4.2.1", key: "A.4.2.1" },
                    { title: "4.2.2", key: "A.4.2.2" },
                    { title: "4.3.0", key: "A.4.3.0" },
                    { title: "4.4.0", key: "A.4.4.0" },
                    { title: "4.4.1", key: "A.4.4.1" },
                    { title: "4.4.2", key: "A.4.4.2" },
                    { title: "4.4.3", key: "A.4.4.3" },
                    { title: "4.4.4", key: "A.4.4.4" },
                    { title: "4.4.99", key: "A.4.4.99" }
                ]
            },
            { 
                title: "5.0", 
                key: "A.5.0",
                children: [
                    { title: "5.0.0", key: "A.5.0.0" },
                    { title: "5.0.1", key: "A.5.0.1" },
                    { title: "5.0.2", key: "A.5.0.2" },
                    { title: "5.1.0", key: "A.5.1.0" },
                    { title: "5.1.1", key: "A.5.1.1" },
                    { title: "5.1.99", key: "A.5.1.99" },
                    { title: "5.2.0", key: "A.5.2.0" },
                    { title: "5.2.1", key: "A.5.2.1" },
                    { title: "5.5.0", key: "A.5.5.0" },
                    { title: "5.12.0", key: "A.5.12.0" }
                ]
            },
            { 
                title: "6.0", 
                key: "A.6.0", 
                children: [
                    { title: "6.0.0", key: "A.6.0.0" },
                    { title: "6.0.1", key: "A.6.0.1" },
                    { title: "6.0.4", key: "A.6.0.4" },
                    { title: "6.1.0", key: "A.6.1.0" }
                ]
            },
            { 
                title: "7.0", 
                key: "A.7.0",
                children: [
                    { title: "7.0.0", key: "A.7.0.0" },
                    { title: "7.0.1", key: "A.7.0.1" },
                    { title: "7.0.99", key: "A.7.0.99" }, 
                    { title: "7.1.0", key: "A.7.1.0" },
                    { title: "7.1.1", key: "A.7.1.1" },
                    { title: "7.1.2", key: "A.7.1.2" },
                    { title: "7.1.3", key: "A.7.1.3" },
                    { title: "7.4.0", key: "A.7.4.0" },
                    { title: "7.4.1", key: "A.7.4.1" },
                    { title: "7.6.2", key: "A.7.6.2" },
                    { title: "7.8.0", key: "A.7.8.0" }
                ]
            },
            { 
                title: "8.0",
                key: "A.8.0",
                children: [
                    { title: "8.0.0", key: "A.8.0.0" },
                    { title: "8.0.1", key: "A.8.0.1" },
                    { title: "8.1.0", key: "A.8.1.0" },
                    { title: "8.1.1", key: "A.8.1.1" },
                    { title: "8.1.2", key: "A.8.1.2" },
                    { title: "8.1.99", key: "A.8.1.99" }
                ] 
            },
            { 
                title: "9.0", 
                key: "A.9.0",
                children: [
                    { title: "9.0.0", key: "A.9.0.0" }, 
                    { title: "9.0.1", key: "A.9.0.1" }, 
                    { title: "9.0.99", key: "A.9.0.99" }, 
                    { title: "9.1.0", key: "A.9.1.0" }
                ]
            },
            { 
                title: "10.0", 
                key: "A.10.0",
                children: [
                    { title: "10.0.0", key: "A.10.0.0" }, 
                    { title: "10.0.99", key: "A.10.0.99" }, 
                    { title: "10.1.0", key: "A.10.1.0" }, 
                    { title: "10.1.1", key: "A.10.1.1" }
                ]
            },
            { 
                title: "11.0", 
                key: "A.11.0",
                children: [
                    { title: "11.0.0", key: "A.11.0.0" },
                    { title: "11.1.0", key: "A.11.1.0" }
                ] 
            },
            { 
                title: "12.0", 
                key: "A.12.0",
                children: [
                    { title: "12.0.0", key: "A.12.0.0" }, 
                    { title: "12.0.5", key: "A.12.0.5" }, 
                    { title: "12.0.99", key: "A.12.0.99" }, 
                    { title: "12.1.0", key: "A.12.1.0" }, 
                    { title: "12.2.0", key: "A.12.2.0" }
                ]
            },
            { 
                title: "13.0",
                key: "A.13.0",
                children: [{ title: "13.0.0", key: "A.13.0.0" }]
            },
            { 
                title: "15.0", 
                key: "A.15.0",
                children: [{ title: "15.0.0", key: "A.15.0.0" }, { title: "15.4.1", key: "A.15.4.1" }] 
            }
        ]
    },
    { 
        title: "IOS",
        key: "ALL.IOS",
        children: [
            {
                title: "3.0",
                key: "I.3.0",
                children: [{ title: "3.0.0", key: "I.3.0.0" }, { title: "3.2.0", key: "I.3.2.0" }] 
            },
            {
                title: "4.0",
                key: "I.4.0",
                children: [{ title: "4.0.0", key: "I.4.0.0" }, { title: "4.3.2", key: "I.4.3.2" }] 
            },
            {
                title: "5.0",
                key: "I.5.0",
                children: [{ title: "5.0.0", key: "I.5.0.0" }, { title: "5.0.1", key: "I.5.0.1" }, { title: "5.1.0", key: "I.5.1.0" }, { title: "5.1.1", key: "I.5.1.1" }] 
            },
            {
                title: "6.0",
                key: "I.6.0",
                children: [
                    { title: "6.0.0", key: "I.6.0.0" }, 
                    { title: "6.0.1", key: "I.6.0.1" },
                    { title: "6.0.2", key: "I.6.0.2" },
                    { title: "6.1.0", key: "I.6.1.0" },
                    { title: "6.1.2", key: "I.6.1.2" },
                    { title: "6.1.3", key: "I.6.1.3" },
                    { title: "6.1.4", key: "I.6.1.4" },
                    { title: "6.1.5", key: "I.6.1.5" },
                    { title: "6.1.6", key: "I.6.1.6" }
                ] 
            },
            {
                title: "7.0",
                key: "I.7.0",
                children: [
                    { title: "7.0.0", key: "I.7.0.0" }, 
                    { title: "7.0.2", key: "I.7.0.2" },
                    { title: "7.0.3", key: "I.7.0.3" },
                    { title: "7.0.4", key: "I.7.0.4" },
                    { title: "7.0.6", key: "I.7.0.6" },
                    { title: "7.1.0", key: "I.7.1.0" },
                    { title: "7.1.1", key: "I.7.1.1" },
                    { title: "7.1.2", key: "I.7.1.2" }
                ]
            },
            {
                title: "8.0",
                key: "I.8.0",
                children: [
                    { title: "8.0.0", key: "I.8.0.0" }, 
                    { title: "8.0.2", key: "I.8.0.2" },
                    { title: "8.1.0", key: "I.8.1.0" },
                    { title: "8.1.1", key: "I.8.1.1" },
                    { title: "8.1.2", key: "I.8.1.2" },
                    { title: "8.1.3", key: "I.8.1.3" },
                    { title: "8.1.4", key: "I.8.1.4" },
                    { title: "8.2.0", key: "I.8.2.0" },
                    { title: "8.3.0", key: "I.8.3.0" },
                    { title: "8.4.0", key: "I.8.4.0" },
                    { title: "8.4.1", key: "I.8.4.1" }
                ]
            },
            {
                title: "9.0",
                key: "I.9.0",
                children: [
                    { title: "9.0.0", key: "I.9.0.0" }, 
                    { title: "9.0.1", key: "I.9.0.1" },
                    { title: "9.0.2", key: "I.9.0.2" },
                    { title: "9.1.0", key: "I.9.1.0" },
                    { title: "9.2.0", key: "I.9.2.0" },
                    { title: "9.2.1", key: "I.9.2.1" },
                    { title: "9.3.0", key: "I.9.3.0" },
                    { title: "9.3.1", key: "I.9.3.1" },
                    { title: "9.3.2", key: "I.9.3.2" },
                    { title: "9.3.3", key: "I.9.3.3" },
                    { title: "9.3.4", key: "I.9.3.4" },
                    { title: "9.3.5", key: "I.9.3.5" },
                    { title: "9.3.6", key: "I.9.3.6" }
                ]
            },
            {
                title: "10.0",
                key: "I.10.0",
                children: [
                    { title: "10.0.0", key: "I.10.0.0" }, 
                    { title: "10.0.1", key: "I.10.0.1" },
                    { title: "10.0.2", key: "I.10.0.2" },
                    { title: "10.0.3", key: "I.10.0.3" },
                    { title: "10.1.0", key: "I.10.1.0" }, 
                    { title: "10.1.1", key: "I.10.1.1" },
                    { title: "10.16.0", key: "I.10.16.0"},
                    { title: "10.2.0", key: "I.10.2.0" },
                    { title: "10.2.1", key: "I.10.2.1" },
                    { title: "10.3.0", key: "I.10.3.0" },
                    { title: "10.3.1", key: "I.10.3.1" },
                    { title: "10.3.2", key: "I.10.3.2" },
                    { title: "10.3.3", key: "I.10.3.3" },
                    { title: "10.3.4", key: "I.10.3.4" }
                ]
            },
            {
                title: "11.0",
                key: "I.11.0",
                children: [
                    { title: "11.0.0", key: "I.11.0.0" },
                    { title: "11.0.1", key: "I.11.0.1" },
                    { title: "11.0.2", key: "I.11.0.2" },
                    { title: "11.0.3", key: "I.11.0.3" },
                    { title: "11.0.7", key: "I.11.0.7" },
                    { title: "11.1.0", key: "I.11.1.0" },
                    { title: "11.1.1", key: "I.11.1.1" },
                    { title: "11.1.2", key: "I.11.1.2" },
                    { title: "11.1.3", key: "I.11.1.3" },
                    { title: "11.2.0", key: "I.11.2.0" },
                    { title: "11.2.1", key: "I.11.2.1" },
                    { title: "11.2.2", key: "I.11.2.2" },
                    { title: "11.2.5", key: "I.11.2.5" },
                    { title: "11.2.6", key: "I.11.2.6" },
                    { title: "11.3.0", key: "I.11.3.0" },
                    { title: "11.3.1", key: "I.11.3.1" },
                    { title: "11.4.0", key: "I.11.4.0" },
                    { title: "11.4.1", key: "I.11.4.1" }
                ]
            },
            {
                title: "12.0",
                key: "I.12.0",
                children: [
                    { title: "12.0.0", key: "I.12.0.0"},
                    { title: "12.0.1", key: "I.12.0.1"},
                    { title: "12.1.0", key: "I.12.1.0"},
                    { title: "12.1.1", key: "I.12.1.1"},
                    { title: "12.1.2", key: "I.12.1.2"},
                    { title: "12.1.3", key: "I.12.1.3"},
                    { title: "12.1.4", key: "I.12.1.4"},
                    { title: "12.2.0", key: "I.12.2.0"},
                    { title: "12.2.9", key: "I.12.2.9"},
                    { title: "12.3.0", key: "I.12.3.0"},
                    { title: "12.3.1", key: "I.12.3.1"},
                    { title: "12.3.2", key: "I.12.3.2"},
                    { title: "12.4.0", key: "I.12.4.0"},
                    { title: "12.4.1", key: "I.12.4.1"},
                    { title: "12.4.2", key: "I.12.4.2"},
                    { title: "12.4.3", key: "I.12.4.3"},
                    { title: "12.4.4", key: "I.12.4.4"},
                    { title: "12.4.5", key: "I.12.4.5"},
                    { title: "12.4.6", key: "I.12.4.6"},
                    { title: "12.4.7", key: "I.12.4.7"},
                    { title: "12.4.8", key: "I.12.4.8"},
                    { title: "12.4.9", key: "I.12.4.9"},
                    { title: "12.5.0", key: "I.12.5.0"},
                    { title: "12.5.1", key: "I.12.5.1"},
                    { title: "12.5.2", key: "I.12.5.2"},
                    { title: "12.5.3", key: "I.12.5.3"},
                    { title: "12.5.4", key: "I.12.5.4"},
                    { title: "12.5.5", key: "I.12.5.5"}
                ]
            },
            {
                title: "13.0",
                key: "I.13.0",
                children: [
                    { title: "13.0.0", key: "I.13.0.0"},
                    { title: "13.1.0", key: "I.13.1.0"},
                    { title: "13.1.1", key: "I.13.1.1"},
                    { title: "13.1.2", key: "I.13.1.2"},
                    { title: "13.1.3", key: "I.13.1.3"},
                    { title: "13.1.4", key: "I.13.1.4"},
                    { title: "13.2.0", key: "I.13.2.0"},
                    { title: "13.2.1", key: "I.13.2.1"},
                    { title: "13.2.2", key: "I.13.2.2"},
                    { title: "13.2.3", key: "I.13.2.3"},
                    { title: "13.3.0", key: "I.13.3.0"},
                    { title: "13.3.1", key: "I.13.3.1"},
                    { title: "13.4.0", key: "I.13.4.0"},
                    { title: "13.4.1", key: "I.13.4.1"},
                    { title: "13.4.5", key: "I.13.4.5"},
                    { title: "13.5.0", key: "I.13.5.0"},
                    { title: "13.5.1", key: "I.13.5.1"},
                    { title: "13.5.5", key: "I.13.5.5"},
                    { title: "13.6.0", key: "I.13.6.0"},
                    { title: "13.6.1", key: "I.13.6.1"},
                    { title: "13.7.0", key: "I.13.7.0"},
                    { title: "13.8.0", key: "I.13.8.0"}
                ]
            },
            {
                title: "14.0",
                key: "I.14.0",
                children: [
                    { title: "14.0.0", key: "I.14.0.0" },
                    { title: "14.0.1", key: "I.14.0.1" },
                    { title: "14.1.0", key: "I.14.1.0" },
                    { title: "14.2.0", key: "I.14.2.0" },
                    { title: "14.2.1", key: "I.14.2.1" },
                    { title: "14.3.0", key: "I.14.3.0" },
                    { title: "14.4.0", key: "I.14.4.0" },
                    { title: "14.4.1", key: "I.14.4.1" },
                    { title: "14.4.2", key: "I.14.4.2" },
                    { title: "14.5.0", key: "I.14.5.0" },
                    { title: "14.5.1", key: "I.14.5.1" },
                    { title: "14.6.0", key: "I.14.6.0" },
                    { title: "14.7.0", key: "I.14.7.0" },
                    { title: "14.7.1", key: "I.14.7.1" },
                    { title: "14.8.0", key: "I.14.8.0" },
                    { title: "14.8.1", key: "I.14.8.1" },
                    { title: "14.8.8", key: "I.14.8.8" }
                ]
            },
            {
                title: "15.0",
                key: "I.15.0",
                children: [
                    { title: "15.0.0", key: "I.15.0.0" },
                    { title: "15.0.1", key: "I.15.0.1" },
                    { title: "15.0.2", key: "I.15.0.2" },
                    { title: "15.0.5", key: "I.15.0.5" },
                    { title: "15.1.0", key: "I.15.1.0" },
                    { title: "15.1.1", key: "I.15.1.1" },
                    { title: "15.2.0", key: "I.15.2.0" },
                    { title: "15.2.1", key: "I.15.2.1" },
                    { title: "15.3.0", key: "I.15.3.0" },
                    { title: "15.3.1", key: "I.15.3.1" },
                    { title: "15.4.0", key: "I.15.4.0" },
                    { title: "15.4.1", key: "I.15.4.1" },
                    { title: "15.4.2", key: "I.15.4.2" },
                    { title: "15.5.0", key: "I.15.5.0" },
                    { title: "15.6.0", key: "I.15.6.0" },
                    { title: "15.7.6", key: "I.15.7.6" }
                ]
            },
            {
                title: "16.0",
                key: "I.16.0",
                children: [{ title: "16.0.0", key: "I.16.0.0" }]
            }
        ] 
    }
]
export default osVersionList