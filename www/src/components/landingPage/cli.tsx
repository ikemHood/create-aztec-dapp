/** @jsxImportSource react */
import Typist from "react-typist";

export default function CodeCard() {
  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-lg sm:w-[600px]"
      aria-hidden="true"
    >
      <div className="inverse-toggle h-[300px] overflow-hidden rounded-lg border border-t3-purple-200/20 bg-white/10 px-1 pb-6 pt-4 font-mono text-[10px] leading-normal text-t3-purple-50 subpixel-antialiased shadow-lg transition-all sm:h-[400px] sm:px-2 sm:text-xs md:px-5">
        <div className="top mb-2 flex">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-orange-300"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
          npm create aztec-dapp@latest
          <Typist.Delay ms={1250} />
        </Typist>
        <Typist
          className="leading-1 translate-y-[-0.2rem] bg-gradient-to-r from-blue-400 via-green-300 to-pink-600 bg-clip-text font-mono text-[7px] text-transparent sm:text-sm md:translate-y-[-0.4rem]"
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <Typist.Delay ms={2000} />
          &nbsp;&nbsp;  ___      _             ____              <br />
          &nbsp;&nbsp; / _ \    / \    _____  |___ \    ___  ___ <br />
          &nbsp;&nbsp;| | | |  / _ \  |_____| __) |   / _ \/ __|<br />
          &nbsp;&nbsp;| |_| | / ___ \ |_____| / __/ |  __/\__ \<br />
          &nbsp;&nbsp; \___/ /_/   \_\        |_____| \___||___/<br />
        </Typist>
        <Typist
          startDelay={2100}
          className=""
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <div>
            ? What will your project be called? (my-aztec-dapp)
            <Typist.Delay ms={500} />
            <Typist
              cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
              avgTypingDelay={50}
              className="inline pl-1 text-blue-400"
            >
              my-aztec-dapp
            </Typist>
          </div>
          <br />
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={4800}
          avgTypingDelay={-10000}
        >
          ? Will you be using TypeScript or JavaScript? (Use arrow keys)
          <br />
          ❯ TypeScript
          <br />
          &nbsp;&nbsp;JavaScript
          <Typist.Backspace count={87} delay={1000} />
          <Typist
            cursor={{ show: false }}
            avgTypingDelay={-10000}
            className="translate-y-[-1.8rem] md:translate-y-[-2.0rem]"
          >
            <span>
              <span>? Will you be using TypeScript or JavaScript?</span>
              <span className="pl-2 text-blue-400">TypeScript</span>
            </span>
          </Typist>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={6300}
          avgTypingDelay={-10000}
          className="translate-y-[-1.8rem] text-green-400 md:translate-y-[-2.0rem]"
        >
          Great choice!
          <br />
          <Typist.Delay ms={1000} />
          <span className="text-white">? Will you be using Tailwind CSS for styling?</span>
          <Typist.Delay ms={900} />
          <span className="pl-2 text-blue-400">Yes</span>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={8000}
          avgTypingDelay={-10000}
          className="translate-y-[-1.8rem] md:translate-y-[-2.0rem]"
        >
          <div className="flex whitespace-nowrap translate-y-[1.0rem]">
            <span>? Would you like to use Next.js App Router?</span>
            <Typist.Delay ms={500} />
            <span className="pl-2 text-blue-400">Yes</span>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={9500}
          avgTypingDelay={-10000}
          className="translate-y-[-0.8rem] md:translate-y-[-0.8rem]"
        >
          <div className="flex whitespace-pre-wrap translate-y-[1.0rem]">
            <span>? Would you like to use ESLint and Prettier or Biome for linting and formatting?</span>
            <Typist.Delay ms={500} />
          </div>
          <div className="translate-y-[1.0rem] pl-2 text-blue-400">ESLint/Prettier</div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={11500}
          avgTypingDelay={-10000}
          className="translate-y-[0.2rem] md:translate-y-[0.2rem]"
        >
          <div className="flex whitespace-nowrap translate-y-[1.0rem]">
            <span>? Which contract type would you like to use?</span>
            <Typist.Delay ms={500} />
            <span className="pl-2 text-blue-400">Counter Contract</span>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={13000}
          avgTypingDelay={-10000}
          className="translate-y-[1.2rem] md:translate-y-[1.2rem]"
        >
          <div className="flex whitespace-nowrap translate-y-[1.0rem]">
            <span>? Should we initialize a Git repository and stage the changes?</span>
            <Typist.Delay ms={500} />
            <span className="pl-2 text-blue-400">Yes</span>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={14500}
          avgTypingDelay={-10000}
          className="translate-y-[2.2rem] md:translate-y-[2.2rem]"
        >
          <div className="flex whitespace-nowrap translate-y-[1.0rem]">
            <span>? Should we run 'npm install' for you?</span>
            <Typist.Delay ms={500} />
            <span className="pl-2 text-blue-400">Yes</span>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={16000}
          avgTypingDelay={-10000}
          className="translate-y-[3.2rem] md:translate-y-[3.2rem]"
        >
          <div className="flex whitespace-nowrap translate-y-[1.0rem]">
            <span>? What import alias would you like to use?</span>
            <Typist.Delay ms={500} />
            <span className="pl-2 text-blue-400">@/</span>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={17500}
          avgTypingDelay={-10000}
          className="translate-y-[4.2rem] text-green-400 md:translate-y-[4.2rem]"
        >
          <div className="translate-y-[1.0rem]">
            Creating your Aztec dApp... Done!
          </div>
        </Typist>
      </div>
    </div>
  );
}
