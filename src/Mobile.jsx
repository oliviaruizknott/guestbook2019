import React from 'react';

const Mobile = () => {
  const sendGuestToStore = (hash) => {
    // strip the starting '#' from the hash
    const name = hash.slice(1);
    window._store.set("GUEST", name, true);
  }

  const hasHash = () => {
    return window.location.hash !== '';
  }

  const isIntro = () => {
    return window.location.hash === '#intro';
  }

  const renderInstructions = () => {
    return (
      <>
        <p>↑</p>
        <p>tap a photo<br/>with your phone</p>
      </>
    )
  }

  const renderContent = () => {
    // if there’s no hash, tell people to come back on desktop
    if (!hasHash()) {
      return (
        <>
          <p>This site is meant to be viewed on desktop and is not built for phones.</p>
          <p>Come back and visit us from your computer!</p>
        </>
      )
    }

    // if the hash is #intro, give them scan instructions
    if (hasHash() && isIntro()) {
      return renderInstructions();
    }

    // if there’s any other hash, it will be a name;
    // save it to app store distributed and show the name with the instructions
    if (hasHash()) {
      sendGuestToStore(window.location.hash);
      return (
        <>
          {renderInstructions()}
          <p>{window.location.hash}</p>
        </>
      )
    }
  }

  return (
    <div className="Mobile">
      {renderContent()}
    </div>
  );
};

export default Mobile;
