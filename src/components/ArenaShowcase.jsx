/** Shared arena media and mode hierarchy for the Home and Maps pages. */
export function ArenaVideo({map}){
 return <video className="map-preview-video" src={map.video}
   autoPlay muted loop playsInline preload="metadata"
   disablePictureInPicture disableRemotePlayback
   aria-hidden="true" tabIndex={-1}/>;
}

export function ArenaGroupHeading({group,count,headingId}){
 return <header className="arena-group-header">
   <div className="arena-group-heading">
     <div className="arena-group-kicker"><span className="arena-group-code">{group.code}</span>
       <span>{group.category} / GAME MODE</span></div>
     <h3 id={headingId}>{group.title}</h3>
     <p>{group.description}</p>
   </div>
   <div className="arena-group-total" aria-label={count+' arenas'}>
     <strong>{String(count).padStart(2,'0')}</strong><span>ARENAS</span>
   </div>
 </header>;
}
