import React, { useContext } from 'react';
import styled from 'styled-components/native';

import VoteButton from './components/VoteButton';
import ActionButton from './components/ActionButton';
import { Alert, Text } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { RootStackParamList } from '../../../routes';
import { SidebarParamList } from '../../../routes/Sidebar';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// GraphQL
// import client from '../../graphql/client';
// import VOTED from '../../graphql/queries/voted';
// import VOTE_SELECTION_LOCAL from '../../graphql/queries/local/voteSelection';
// import TOGGLE_NOTIFICATION from '../../graphql/mutations/toggleNotification';
// import GET_PROCEDURE from '../../graphql/queries/getProcedure';
// import ActivityIndexWrapper from '../../components/ActivityIndexWrapper';

const SegmentWrapper = styled.View`
  padding-vertical: 10;
  padding-horizontal: 18;
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: rgba(68, 148, 211, 0.1);
  align-items: center;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const VoteWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 500;
  align-self: center;
  padding-horizontal: 18;
  padding-vertical: 11;
`;

const VoteButtonWrapper = styled.View`
  align-items: center;
`;

const VoteButtonLabel = styled.Text`
  padding-top: 11;
  font-size: 12;
  color: rgb(150, 150, 150);
`;

const Title = styled.Text`
  font-size: 18;
`;

const TitleAddition = styled.Text`
  font-size: 18;
  color: grey;
  padding-left: 5;
`;

const VerificationTouch = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
`;

// const LockIcon = styled(Ionicons).attrs(() => ({
//   size: 20,
//   name: 'ios-lock-outline',
//   color: 'grey',
// }))``;

// const InfoIcon = styled(Ionicons).attrs(() => ({
//   size: 35,
//   name: 'ios-information',
//   color: 'grey',
// }))`
//   margin-top: -4;
// `;

const LockIconWrapper = styled.View`
  position: absolute;
  top: -3;
  right: -3;
  background-color: rgba(255, 255, 255, 0.9);
  width: 30;
  height: 30;
  align-items: center;
  justify-content: center;
  border-radius: 14;
  border-width: 1;
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
`;

interface Props {
  verified: boolean;
  voted: boolean;
  procedureObjId: string;
  procedureId: string;
  type: string;
  // refetch: () => void;
  // list: string;
  notify: boolean;
  share: () => void;
  // active: boolean;
}

type DetailScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
  CompositeNavigationProp<
    DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
    StackNavigationProp<RootStackParamList>
  >
>;

const PrepareActions: React.FC<Props> = ({
  verified,
  voted,
  procedureObjId,
  procedureId,
  type,
  // list,
  notify,
  share,
  // active,
}) => {
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const navigation = useNavigation<DetailScreenNavigationProps>();

  const showUnknownVoteNotification = () => {
    Alert.alert(
      'Deine Stimme ist lokal verlorengegangen',
      'Für weitere Informationen schaue bitte ins FAQ',
    );
    // TODO link to FAQ
  };

  const verify = () => {
    navigation.navigate('Verification');
    // TODO go to verification
  };

  const voteSelection = getLocalVoteSelection(procedureId);

  return (
    <Wrapper>
      <SegmentWrapper>
        <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>
        <TitleAddition>über {type}</TitleAddition>
      </SegmentWrapper>
      {!verified ? <VerificationTouch onPress={verify} /> : null}
      <VoteWrapper>
        {(!voted || (voted && voteSelection === 'YES')) && (
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="YES"
              voteSelection={voteSelection}
              onPress={() => {
                navigation.navigate('Voting', {
                  selection: VoteSelection.YES,
                  procedureId,
                  procedureObjId,
                });
              }}
            />
            <VoteButtonLabel>
              {!voted ? 'Zustimmen' : 'Zugestimmt'}
            </VoteButtonLabel>
          </VoteButtonWrapper>
        )}
        {(!voted || (voted && voteSelection === 'ABSTINATION')) && (
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="ABSTINATION"
              voteSelection={voteSelection}
              onPress={() => {
                navigation.navigate('Voting', {
                  selection: VoteSelection.ABSTINATION,
                  procedureId,
                  procedureObjId,
                });
              }}
            />
            <VoteButtonLabel>Enthalten</VoteButtonLabel>
          </VoteButtonWrapper>
        )}
        {(!voted || (voted && voteSelection === 'NO')) && (
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="NO"
              voteSelection={voteSelection}
              onPress={() => {
                navigation.navigate('Voting', {
                  selection: VoteSelection.NO,
                  procedureId,
                  procedureObjId,
                });
              }}
            />
            <VoteButtonLabel>
              {!voted ? 'Ablehnen' : 'Abgelehnt'}
            </VoteButtonLabel>
          </VoteButtonWrapper>
        )}

        {!voteSelection && voted && (
          <VoteButtonWrapper>
            <ActionButton
              selection="UNKNOWN"
              onPress={showUnknownVoteNotification}
            />
            <VoteButtonLabel>Abgestimmt</VoteButtonLabel>
            <LockIconWrapper>
              <Text>info icon</Text>
            </LockIconWrapper>
          </VoteButtonWrapper>
        )}
        {voted && (
          <VoteButtonWrapper>
            <ActionButton
              selection="NOTIFY"
              notify={notify}
              onPress={() => Alert.alert('Notify')}
            />
            <VoteButtonLabel>
              {notify ? 'Stumm schalten' : 'Benachrichtigen'}
            </VoteButtonLabel>
          </VoteButtonWrapper>
        )}
        {voted && (
          <VoteButtonWrapper>
            <ActionButton selection="SHARE" onPress={share} />
            <VoteButtonLabel>Teilen</VoteButtonLabel>
          </VoteButtonWrapper>
        )}
      </VoteWrapper>
    </Wrapper>
  );
};

export default PrepareActions;
