const logos = [
  {
    name: "Tenaga Nasional Berhad",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/73/Tenaga_Nasional.svg",
  },
  {
    name: "Maxis",
    url: "https://upload.wikimedia.org/wikipedia/en/f/f6/Maxis_Communications_logo.svg",
  },
  {
    name: "UPM",
    url: "upm.svg",
  },
  {
    name: "UiTM",
    url: "uitm.svg",
  },
  {
    name: "UNITEN",
    url: "uniten.svg",
  },

  {
    name: "ITXOTIC",
    url: "itxotic.svg",
  },
  {
    name: "Yayasan Tenaga Nasional",
    url: "ytn.svg",
  },
  {
    name: "Bester Energy Sdn Bhd",
    url: "bester.svg",
  },
  {
    name: "Celcom Digi",
    url: "celcom-digi.svg",
  },
  {
    name: "Aerodyne Group",
    url: "aerodyne.svg",
  },
];

const LogoCloud2 = () => {
  return (
    <div className="w-full  pb-12">
      <h2 className="text-center font-bold text-3xl text-white">Trusted By</h2>
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map(
              (
                _,
                index // Replace null with `_` to ignore it and use `index`
              ) => (
                <div
                  key={index} // Now `index` will provide a unique key
                  className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                >
                  {logos.map((logo, key) => (
                    <img
                      key={key}
                      src={logo.url}
                      className="size-28  px-2 brightness-0  invert"
                      alt={`${logo.name}`}
                    />
                  ))}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud2;
