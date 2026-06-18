import { Button, TextInput } from "@mantine/core";

const Subscribe = () => {
  return (
    <div
      className="
      mt-20
      flex
      flex-col
      lg:flex-row
      items-center
      justify-around
      bg-mine-shaft-900
      mx-4
      md:mx-10
      lg:mx-20
      py-5
      px-4
      rounded-xl
      gap-5
      "
    >
      <div
        className="
        text-2xl
        sm:text-3xl
        lg:text-4xl
        w-full
        lg:w-2/5
        text-center
        font-semibold
        text-mine-shaft-100
        "
      >
        Never Wants to Miss Any{" "}
        <span className="text-bright-sun-400">
          Job News?
        </span>
      </div>

      <div
        className="
        flex
        flex-col
        sm:flex-row
        w-full
        lg:w-auto
        gap-3
        rounded-xl
        bg-mine-shaft-800
        p-3
        items-center
        "
      >
        <TextInput
          className="
          w-full
          sm:w-[250px]
          [&_input]:text-mine-shaft-100
          font-semibold
          "
          variant="unstyled"
          placeholder="Your@email.com"
          size="lg"
        />

        <Button
          size="lg"
          className="
          !rounded-lg
          w-full
          sm:w-auto
          "
          color="bright-sun.4"
          variant="filled"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;