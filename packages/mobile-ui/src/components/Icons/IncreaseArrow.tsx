import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgIncreaseArrow = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M108 1024c-9.273 0-17-8.073-17-18 0-9.95 7.727-18 17-18h809c9.273 0 17 8.05 17 18 0 9.927-7.727 18-17 18H108zm118-626c-5.036 0-10.284-2.559-14-7-5.29-8.443-3.639-19.769 4-26L612 61 455 36c-9.244-1.47-15.733-10.681-14-21 1.09-9.457 9.902-16.268 19-15l188 30c7.68.754 14.134 4.825 19 11 3.958 6.323 5.79 13.987 5 22l-28 197c-1.63 8.966-9.007 15.426-17 15-1.263.426-2.128.357-3 0-9.385-1.257-15.898-10.457-14-20l23-166-397 305c-2.615 2.863-6.19 4-10 4zm530 511h78c32.538 0 59-27.834 59-62V346c0-34.177-26.462-62-59-62h-78c-32.538 0-59 27.812-59 62v501c-.011 34.166 26.45 62 59 62zm-24-563c0-14.438 11.017-26 25-26h77c13.995 0 25 11.562 25 26v500c0 14.427-11.005 26-25 26h-77c-13.972 0-24.989-11.573-25-26V346zM551 454h-78c-32.532 0-59 27.815-59 62v331c0 34.174 26.468 62 59 62h78c32.532 0 59-27.826 59-62V516c0-34.185-26.468-62-59-62zm25 393c0 14.406-10.988 26-25 26h-77c-14.012 0-25-11.594-25-26V516c0-14.417 10.988-26 25-26h77c14.012 0 25 11.583 25 26v331zm-386 61h78c32.535 0 59-27.804 59-62V685c0-34.218-26.465-62-59-62h-78c-32.535 0-59 27.782-59 62v161c0 34.196 26.465 62 59 62zm-24-222c0-14.42 11.006-26 25-26h77c14.005 0 25 11.58 25 26v161c0 14.408-10.995 26-25 26h-77c-13.994 0-25-11.592-25-26V686z"
        id="increase-arrow_svg__path-1"
      />
    </Defs>
    <G
      id="increase-arrow_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="increase-arrow_svg__increase-arrow">
        <Mask id="increase-arrow_svg__mask-2" fill="#fff">
          <Use xlinkHref="#increase-arrow_svg__path-1" />
        </Mask>
        <Use
          id="increase-arrow_svg__Shape"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#increase-arrow_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgIncreaseArrow;