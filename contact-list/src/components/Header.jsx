import React from "react";

function Header({ currentView, setCurrentView }) {
    const showBack = currentView !== "list";

    return (
        <div className="header">
            {showBack ? (
                <button className="icon" onClick={() => setCurrentView("list")}>
                    ←
                </button>
            ) : (
                <h2>Contacts</h2>
            )}

            {!showBack && (
                <div className="header-icons">
                    <button className="icon" onClick={() => setCurrentView("search")}>
                        ⌕
                    </button>
                    <button className="icon" onClick={() => setCurrentView("add")}>
                        ＋
                    </button>

                </div>
            )}
        </div>
    );
}

export default Header;
