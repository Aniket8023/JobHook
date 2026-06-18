import { companyData } from "../Data/Company";

const AboutComp = () => {
  const company: { [key: string]: any } = companyData;

  return (
    <div className="flex flex-col gap-6">
      {Object.keys(company).map(
        (key, index) =>
          key !== "Name" && (
            <div key={index}>
              <div className="text-lg md:text-xl mb-3 font-semibold">
                {key}
              </div>

              {key !== "Website" && (
                <div className="text-sm md:text-base text-mine-shaft-300 text-justify">
                  {key !== "Specialties"
                    ? company[key]
                    : company[key].map(
                        (item: string, index: number) => (
                          <span key={index}>
                            {" "}
                            &bull; {item}
                          </span>
                        )
                      )}
                </div>
              )}

              {key === "Website" && (
                <a
                  href={company[key]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm md:text-base break-all text-bright-sun-400"
                >
                  {company[key]}
                </a>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default AboutComp;