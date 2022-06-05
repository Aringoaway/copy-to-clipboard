import { useState, useEffect } from "react";

function CopyToClipboard () {
    // State for the copied text
    const [copyText, setCopyText] = useState(false);
    // State for the date from backend
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Your data
    const fetchData = async () => {
        let response;
        response = [
            {
            text: "Computer programming is the process of performing a particular computation (or more generally, accomplishing a specific computing result), usually by designing/building an executable computer program.",
            resorce: 'https://en.wikipedia.org/wiki/Computer_programming',
            },
        ];
        setData(response);
    }

    // function for IE, IE dosen't have navigatior
    function fallbackCopyTextToClipboard(text) {
        try {
            let successful = document.execCommand("copy");
            let msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }
    }


    // main copy function
    function copyTextToClipboard(text) {
        // conditions for IE
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }

        navigator.clipboard.writeText(text).then(
            function() {
                console.log("Async: Copying to clipboard was successful!");
                setCopyText(true);
                // function for changing the icon after 2 sec
                setTimeout(() => {
                    setCopyText(false);
                }, 2000);
            },
            function(err) {
                console.error("Async: Could not copy text: ", err);
            }
        );
    }

    return (
        <div>
            {data.map((item, index) =>
                <>
                    <p key={index}>{item.text}</p>
                    <button style={{backgroundColor: "green", color: "white", border: "none", padding: "10px 15px", borderRadius: "8px", display: "flex", alignItems: "center", margin: "0 auto 30px"}} key={index} onClick={() => copyTextToClipboard(item?.text)}>
                        {copyText ?
                            <>
                                <svg style={{paddingRight: "5px"}} width="12" height="6ю6" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.394012 6.74199L5.13701 10.362L12.753 1.658L11.247 0.341995L4.86301 7.63799L1.60601 5.152L0.394012 6.74199ZM19.753 1.658L18.247 0.341995L11.878 7.621L11.125 7.019L9.87501 8.581L12.122 10.379L19.753 1.658Z" fill="white"/>
                                </svg>
                                Copied
                            </>
                            :
                            <>
                                <svg style={{paddingRight: "5px"}} width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 0H2.625C2.55625 0 2.5 0.05625 2.5 0.125V1C2.5 1.06875 2.55625 1.125 2.625 1.125H10.375V11.875C10.375 11.9438 10.4312 12 10.5 12H11.375C11.4438 12 11.5 11.9438 11.5 11.875V0.5C11.5 0.223437 11.2766 0 11 0ZM9 2H1C0.723437 2 0.5 2.22344 0.5 2.5V10.7922C0.5 10.925 0.553125 11.0516 0.646875 11.1453L3.35469 13.8531C3.38906 13.8875 3.42813 13.9156 3.47031 13.9391V13.9688H3.53594C3.59062 13.9891 3.64844 14 3.70781 14H9C9.27656 14 9.5 13.7766 9.5 13.5V2.5C9.5 2.22344 9.27656 2 9 2ZM3.46875 12.3781L2.12344 11.0312H3.46875V12.3781ZM8.375 12.875H4.46875V10.6562C4.46875 10.3109 4.18906 10.0312 3.84375 10.0312H1.625V3.125H8.375V12.875Z" fill="white"/>
                                </svg>
                                Copy Query
                            </>
                        }
                    </button>
                    <textarea placeholder="You can paste the copied text here" rows="4" cols="50"></textarea>
                    {data.map((item, idx) => (
                        <div>
                            <a href={item.resorce} key="idx">{item.resorce}</a>
                        </div>

                    ))}
                </>
            )}
        </div>
    );
}

export default CopyToClipboard;