import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import {
  verifyEmailMutation,
  verifyEmailMutationVariables
} from '../../__generated__/verifyEmailMutation';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailMutation($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: verifyEmailMutation) => {
    const {
      verifyEmail: { ok }
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData?.me.id}`,
        fragment: gql`
          fragment VerifyedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        }
      });
      history.push("/");
    }
  }
  const [verifyEmail] = useMutation<
    verifyEmailMutation,
    verifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted
  });

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code
        }
      }
    });
  }, [])
  return (
    <div className=" mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Confirming Email| Ouber Eats</title>
      </Helmet>
      <h2 className="text-xl font-semibold text-gray-800">Confirming Email...</h2>
      <h4 className="text-md font-light text-gray-600 mt-3">Please wait. Don't close this page...</h4>
    </div>
  );
}