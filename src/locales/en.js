export default {
  custom_text: {
    do_not_have_an_account: 'You do not have an account? ',
    already_have_an_account: 'Already have an account? ',
    create_account: 'Create account',
    back_to_login: 'Back to login',
    forgot_password_description:
      'Please enter your email address. We will send you a link to reset your password',
    enter_reset_code: 'We have sent a password reset code to your email',
    check_email: 'Check your email!',
    create_question_content: 'Enter data to create a question',
    create_punishment_content: 'Enter data to create a punishment',
    create_room_content: 'Enter data to create a room',
    yes: 'Yes',
    no: 'No',
  },

  terms_and_condition: {
    start: 'By registering, you confirm that you accept our ',
    terms_of_use: 'Terms of Use ',
    and: 'and ',
    privacy_policy: 'Privacy Policy',
  },

  header: {
    login: 'Login',
    registration: 'Registration',
    home: 'Home',
    forgot_password: 'Forgot your password?',
    forgot_password: 'Reset your password',
    questions: 'Questions',
    punishments: 'Punishments',
    add_question: 'Add question',
    add_punishment: 'Add punishment',
    add_room: 'Add room',
    public_rooms: 'Public rooms',
  },

  placeholder: {
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Repeat password',
    name: 'Name',
    username: 'Username',
    reset_code: 'Reset code',
    enter_reset_code: 'Enter the code sent in the email',
    punishment: 'Punishment context',
    question: 'Question context',
    answer: 'Answer',
    room_name: 'Room name',
    is_public: 'Public room',
    choose_options: 'Select an options',
  },

  button: {
    login: 'Log in',
    register: 'Register',
    forgot_password: 'Forgot password?',
    send_reset_link: 'Send reset link',
    reset: 'Reset',
    add_question: 'Add question',
    add_punishment: 'Add punishment',
    add_room: 'Create room',
    add: 'Add',
  },
  error: {
    username: {
      required: 'Username is required',
      min: 'Username must be more than 3 characters',
      max: 'Username must be less than 24 characters',
    },
    name: {
      required: 'Name is required',
      min: 'Name must be more than 3 characters',
      max: 'Name must be less than 38 characters',
    },
    email: {
      required: 'Email is required',
      pattern: 'Invalid email',
    },
    password: {
      required: 'Password is required',
      min: 'Password must be more than 8 characters',
      max: 'Password must be less than 32 characters',
      pattern:
        'Password must contain at least one letter, one number, and one unique character',
      confirm: 'Password do not match',
    },
    reset_code: {
      required: 'Reset code is required',
      min: 'Reset code must be more than 8 characters',
      max: 'Reset code must be less than 32 characters',
    },
    question: {
      required: 'Question content is required',
    },
    punishment: {
      required: 'Punishment content is required',
    },
    answer: {
      required: 'Answer is required',
      pattern: 'Only numeric values are allowed',
    },
    room_name: {
      required: 'Room name is required',
    },
    select: {
      required: 'You must select an options',
    },
  },
};
