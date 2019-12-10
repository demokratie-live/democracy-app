import React, { FC, useContext } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../../routes';

import { Slide } from '@democracy-deutschland/mobile-ui/src/components/Introduction';
import { slidesData } from '@democracy-deutschland/mobile-ui/src/components/Introduction/data';
import { getSlides } from './utils/getSlides';
import { InitialStateContext } from '../../../context/InitialStates';
import Carousel, { CarouselProps } from 'react-native-snap-carousel';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

type IntroductionScreenRouteProp = RouteProp<
  RootStackParamList,
  'Introduction'
>;

type Props = {
  route: IntroductionScreenRouteProp;
};

const Introduction: FC<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isVerified } = useContext(InitialStateContext);
  const { lastStartWithVersion, done } = route.params;

  const finishAction = () => {
    if (done) {
      done();
    }
    navigation.goBack();
  };

  const verifyAction = () => {
    if (done) {
      done();
    }
    navigation.push('Verification');
  };

  const slides = getSlides({
    lastVersion: lastStartWithVersion,
    registered: isVerified,
  });

  const _renderItem: CarouselProps<Slide>['renderItem'] = ({ item, index }) => {
    return (
      <Slide
        key={item.head.title}
        head={item.head}
        images={item.images}
        isNew={item.isNew}
        verify={
          index + 1 === Object.keys(slidesData).length
            ? verifyAction
            : undefined
        }
        nextSlide={
          // TODO fix android next button click. does not work correctly
          index + 1 === Object.keys(slidesData).length
            ? finishAction
            : undefined
        }
      />
    );
  };

  return (
    <SafeAreaView testID="Introduction">
      <Carousel<Slide>
        data={slides}
        renderItem={_renderItem}
        sliderWidth={300}
        itemWidth={300}
      />
    </SafeAreaView>
  );
};

export default Introduction;
