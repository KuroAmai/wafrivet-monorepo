export const Stats = () => {
  const stats = [
    { value: "500+", label: "Animals Registered" },
    { value: "2,000+", label: "Farmers Onboarded" },
    { value: "50+", label: "Agro-vet Chemists" },
    { value: "20+", label: "Veterinarians" },
  ];

  return (
    <section className="w-full py-4 md:py-6 bg-background flex justify-center z-10 relative">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-center py-6 md:py-8 border-y md:border-y-0 border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col flex-1 px-4 md:px-10 py-6 md:py-0 w-full"
            >
              <h3 className="text-[2.75rem] font-geist font-medium text-black mb-2 tracking-tight leading-none">
                {stat.value}
              </h3>
              <p className="text-[16px] font-quicksand font-medium text-black">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
