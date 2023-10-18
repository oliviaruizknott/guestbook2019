import React from "react";

const Mobile = ({ nfc }) => {
  const sendGuestToStore = (hash) => {
    // strip the starting '#' from the hash
    const name = hash.slice(1);
    window._store.set("GUEST", name, true);
  };

  const hasHash = () => {
    return window.location.hash !== "";
  };

  const renderInstructions = () => {
    return (
      <>
        <p>↑</p>
        <p>
          tap a photo
          <br />
          with your phone
        </p>
      </>
    );
  };

  const renderContent = () => {
    // if we’re at the root (and not /nfc), tell people to come back on desktop
    if (!nfc) {
      return (
        <>
          <p>
            This site is meant to be viewed on desktop and is not built for
            phones.
          </p>
          <p>Come back and visit from your computer!</p>
        </>
      );
    }

    // if we are at /nfc, render the instructions
    // if there’s a guest in the hash, save it to app store distributed and show the name
    if (nfc) {
      if (hasHash()) sendGuestToStore(window.location.hash);
      return (
        <>
          {renderInstructions()}
          {hasHash() && window.location.hash}
        </>
      );
    }
  };

  return <div className="Mobile">{renderContent()}</div>;
};

export default Mobile;
