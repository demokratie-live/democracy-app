import React, { FC } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../../routes';

import { Slide } from '@democracy-deutschland/mobile-ui/src/components/Introduction';
import { slidesData } from '@democracy-deutschland/mobile-ui/src/components/Introduction/data';
import { Pager } from '@democracy-deutschland/mobile-ui/src/components/Pager';
import { getSlides } from './utils/getSlides';

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
    navigation.replace('Verification', {});
  };

  const slides = getSlides({
    lastVersion: lastStartWithVersion,
    registered: false,
  });

  return (
    <SafeAreaView testID="Introduction">
      <Pager
        nextButton
        nextText="Weiter"
        finishText="Los geht's"
        finishAction={finishAction}>
        {slides.map((slide, i) => (
          <Slide
            key={slide.head.title}
            head={slide.head}
            images={slide.images}
            isNew={slide.isNew}
            verify={
              i + 1 === Object.keys(slidesData).length
                ? verifyAction
                : undefined
            }
            nextSlide={
              // TODO fix android next button click. does not work correctly
              i + 1 === Object.keys(slidesData).length
                ? finishAction
                : undefined
            }
          />
        ))}
      </Pager>
    </SafeAreaView>
  );
};

export default Introduction;
