import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import "./App.css";

function App() {
  const [videoSrc, setVideoSrc] = useState("");
  const [message, setMessage] = useState("Click Start to transcode");
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const doTranscode = async () => {
    setMessage("Loading ffmpeg-core.js");
    await ffmpeg.load();
    setMessage("Start transcoding");
    ffmpeg.FS(
      "writeFile",
      "test.avi",
      await fetchFile(
        "https://r5---sn-ci5gup-a3ve.googlevideo.com/videoplayback?expire=1606382922&ei=6SC_X6b3OuXk4-EPiIODwAs&ip=223.235.79.103&id=o-APE2qx1bvnGCLibGcfxEG7otD6QpG45PLsGOrj1lhbKZ&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&mh=1M&mm=31%2C29&mn=sn-ci5gup-a3ve%2Csn-ci5gup-qxaee&ms=au%2Crdu&mv=m&mvi=5&pl=21&initcwndbps=818750&vprv=1&mime=video%2Fmp4&ns=L1asI6Vcs4urp8PeP9l913cF&gir=yes&clen=9091142&dur=59.960&lmt=1597222012724478&mt=1606360834&fvip=5&keepalive=yes&c=WEB&txp=5535432&n=AuzEsuwNMR3eAjGoDcp&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgRmFjkui16AoIC43J5iy4q0ULJv-2-l_i05Jqpy9gjCcCIQDj3ca9xmYvPBENBTrUPfRXjmmcWZ9HnVf1V9ydJh_cMA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgA2GGDIfIpURfN79FsBueLM6XOI5pSPNyqcnFuW16HqMCIF1XYwHKlCOpjxanRNo_9KKLAKq6paVDtwDJtLciaAv1&ratebypass=yes"
      )
    );
    ffmpeg.FS(
      "writeFile",
      "test.avi",
      await fetchFile(
        "https://r5---sn-ci5gup-a3ve.googlevideo.com/videoplayback?expire=1606382922&ei=6SC_X6b3OuXk4-EPiIODwAs&ip=223.235.79.103&id=o-APE2qx1bvnGCLibGcfxEG7otD6QpG45PLsGOrj1lhbKZ&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&mh=1M&mm=31%2C29&mn=sn-ci5gup-a3ve%2Csn-ci5gup-qxaee&ms=au%2Crdu&mv=m&mvi=5&pl=21&initcwndbps=818750&vprv=1&mime=video%2Fmp4&ns=L1asI6Vcs4urp8PeP9l913cF&gir=yes&clen=9091142&dur=59.960&lmt=1597222012724478&mt=1606360834&fvip=5&keepalive=yes&c=WEB&txp=5535432&n=AuzEsuwNMR3eAjGoDcp&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgRmFjkui16AoIC43J5iy4q0ULJv-2-l_i05Jqpy9gjCcCIQDj3ca9xmYvPBENBTrUPfRXjmmcWZ9HnVf1V9ydJh_cMA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgA2GGDIfIpURfN79FsBueLM6XOI5pSPNyqcnFuW16HqMCIF1XYwHKlCOpjxanRNo_9KKLAKq6paVDtwDJtLciaAv1&ratebypass=yes"
      )
    );

    await ffmpeg.run("-i", "test.avi", "test.mp4");
    setMessage("Complete transcoding");
    const data = ffmpeg.FS("readFile", "test.mp4");
    setVideoSrc(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
  };
  return (
    <div className="App">
      <p />
      <video src={videoSrc} controls></video>
      <br />
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
