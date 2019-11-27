import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgGovernment = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M996 265L557 41c-24.645-12.088-65.343-12.088-90 0L28 265c-16.133 7.889-28 27.246-28 45v43c0 23.725 19.115 42.843 43 43h73v66c-.31 15.332 12.046 27.672 27 28h5v236h-5c-14.954.176-27.31 12.516-27 28v66H72c-39.892.061-72 32.145-72 72v28c0 39.905 32.108 72 72 72h880c39.892 0 72-32.095 72-72v-28c0-39.855-32.108-71.939-72-72h-44v-66c.31-15.484-12.046-27.824-27-28h-5V490h5c14.954-.328 27.31-12.668 27-28v-66h73c23.885-.157 43-19.275 43-43v-43c0-17.754-11.867-37.111-28-45zm-44 588c21.705 0 39 17.299 39 39v28c0 21.69-17.295 39-39 39H72c-21.705 0-39-17.31-39-39v-28c0-21.701 17.295-39 39-39h880zM154 457h-5v-61h138v59h-5c-14.66-.026-26.986 12.33-27 27v248c.014 15.055 12.34 27.389 27 27h5v63H149v-61h5c14.648.162 26.986-12.171 27-27V484c-.003-14.886-12.34-27.22-27-27zm283 31h5v236h-5c-14.718.378-27.09 12.712-27 28v68h-90v-68c.09-15.288-12.259-27.622-27-28h-5V488h5c14.741-.016 27.09-12.35 27-28v-64h90v64c-.09 15.65 12.282 27.984 27 28zm11-33h-5v-59h138v61h-4c-15.648-.22-27.952 12.112-28 27v248c.048 14.83 12.352 27.164 28 27h4v61H443v-63h5c14.682.39 26.986-11.943 27-27V482c-.014-14.672-12.318-27.028-27-27zm283 35h5v236h-5c-14.73.163-27.078 12.497-27 28v66h-90v-66c.067-15.503-12.304-27.837-28-28h-4V490h4c15.696-.22 28.067-12.553 28-28v-66h90v66c-.078 15.447 12.27 27.78 27 28zm11-33h-5v-61h138v61h-5c-14.66-.22-26.988 12.112-27 27v248c.012 14.83 12.34 27.164 27 27h5v61H737v-61h5c14.66.164 26.977-12.17 27-27V484c-.023-14.888-12.34-27.22-27-27zm249-104c0 5.691-4.29 10-10 10H43c-5.71 0-10-4.309-10-10v-43c0-5.118 4.927-13.133 10-15L482 71c7.812-3.817 18.622-6 30-6s22.2 2.183 30 6l439 224c5.073 1.867 9.989 9.871 10 15v43zM512 136c-47.644 0-86 38.335-86 85 0 47.631 38.345 86 86 86 46.655 0 85-38.369 85-86 0-46.665-38.356-85-85-85zm0 138c-29.442 0-53-23.562-53-53 0-28.45 23.558-52 53-52 28.453 0 52 23.55 52 52 0 29.426-23.547 53-52 53z"
        id="government_svg__path-1"
      />
    </Defs>
    <G
      id="government_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="government_svg__government">
        <Mask id="government_svg__mask-2" fill="#fff">
          <Use xlinkHref="#government_svg__path-1" />
        </Mask>
        <Use
          id="government_svg__Shape"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#government_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgGovernment;