import { gql, useApolloClient, useMutation } from "@apollo/client";
import { data } from "autoprefixer";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { EMAIL_REGEX } from "../../constants";
import { useMe } from "../../hooks/useMe";
import { editProfileMutation, editProfileMutationVariables } from "../../__generated__/editProfileMutation";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation ($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const onCompleted = (data: editProfileMutation) => {
    const { editProfile: { ok } } = data;
    if (ok && userData) {
      const { me: { email: prevEmail } } = userData;;
      const { email: newEmail } = getValues();
      if (prevEmail != newEmail) {
        client.writeFragment({
          id: `User:${userData.me.id}`,
          fragment: gql`
            fragment editedUser on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          }
        });
      }
      alert("Profile was successfully edited!!");
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onBlur",
    defaultValues: {
      email: userData?.me.email,
    }
  });
  const onSubmit = () => {
    console.log(getValues());
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          ...(email !== "" && { email }),
          ...(password !== "" && { password }),
        }
      }
    });
  };

  return (
    <div className=" mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Ouber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 pt-5 w-full mb-4 max-w-screen-sm"
      >
        <input
          ref={register({
            pattern: EMAIL_REGEX,
          })}
          name="email"
          type="email"
          placeholder="Email"
          className="input"
        />
        <input
          ref={register}
          name="password"
          type="password"
          placeholder="New Password"
          className="input"
        />
        <Button canClick={!loading && formState.isValid} loading={loading} actionText="Update Profile" />
      </form>
    </div>
  );
}