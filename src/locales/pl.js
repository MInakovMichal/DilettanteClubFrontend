export default {
  custom_text: {
    do_not_have_an_account: 'Nie masz konta? ',
    already_have_an_account: 'Mash już konto? ',
    create_account: 'Dodaj konto',
    back_to_login: 'Powrót do logowania',
    forgot_password_description:
      'Podaj swój adres e-mail. Wyślijmy link do zresetowania hasła',
    enter_reset_code: 'Wysłaliśmy kod resetowania hasła na podany adres e-mail',
    check_email: 'Sprawdź swój email!',
    create_question_content: 'Podaj dane dla utworzenia zapytania',
    create_punishment_content: 'Podaj dane dla utworzenia kary',
    create_room_content: 'Podaj dane dla utworzenia pokoju',
    yes: 'Tak',
    no: 'Nie',
  },

  terms_and_condition: {
    start: 'Rejestrując się, potwierdzasz, że akceptujesz nasze ',
    terms_of_use: 'Warunki użytkowania ',
    and: 'i ',
    privacy_policy: 'Politykę prywatności',
  },

  header: {
    login: 'Logowanie',
    registration: 'Rejestracja',
    home: 'Strona główna',
    forgot_password: 'Zapomniałeś hasło?',
    reset_password: 'Zresetuj swoje hasło',
    questions: 'Zapytania',
    punishments: 'Kary',
    add_question: 'Dodaj zapytanie',
    add_punishment: 'Dodaj karę',
    add_room: 'Dodaj pokój',
    public_rooms: 'Pokoje publiczne',
  },

  placeholder: {
    email: 'Email',
    password: 'Hasło',
    password_confirmation: 'Powtórz hasło',
    name: 'Imie',
    username: 'Nazwa użytkownika',
    reset_code: 'Kod do resetowania',
    punishment: 'Treść kary',
    question: 'Treść zapytania',
    answer: 'Odpowiedż',
    room_name: 'Nazwa pokoju',
    is_public: 'Czy pokój publiczny',
    choose_options: 'Wybierz opcje',
  },

  button: {
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    forgot_password: 'Zapomniałeś hasło?',
    send_reset_link: 'Wyślij link do resetowania',
    reset: 'Zresetuj',
    add_question: 'Dodaj zapytanie',
    add_punishment: 'Dodaj karę',
    add_room: 'Stwórz pokój',
    add: 'Dodaj',
  },
  error: {
    username: {
      required: 'Nazwa użytkownika jest wymagana',
      min: 'Nazwa użytkownika musi być co najmniej 3 znaki',
      max: 'Nazwa użytkownika nie może być więcej niż 24 znaki',
    },
    name: {
      required: 'Imie użytkownika jest wymagane',
      min: 'Imie musi być co najmniej 3 znaki',
      max: 'Imie musi nie może być więcej niż 38 znaków',
    },
    email: {
      required: 'Email jest wymagany',
      pattern: 'Niepoprawny email',
    },
    password: {
      required: 'Hasło jest wymagane',
      min: 'Hasło musi być co najmniej 8 znaków',
      max: 'Hasło nie może być więcej niż 32 znaki',
      pattern:
        'Hasło musi zawierać co najmniej jedną literę, jedną cyfrę i jeden unikalny znak',
      confirm: 'Hasło nie pasuje',
    },
    reset_code: {
      required: 'Kod do resetowania jest wymagany',
      min: 'Kod do resetowania musi być co najmniej niż 8 znaków',
      max: 'Kod do resetowania nie może być więcej niż 32 znaki',
    },
    question: {
      required: 'Treść zapytania jest wymagana',
    },
    punishment: {
      required: 'Treść kary jest wymagana',
    },
    answer: {
      required: 'Odpowiedż jest wymagana',
      pattern: 'Dozwolone są tylko wartości liczbowe',
    },
    room_name: {
      required: 'Odpowiedż jest wymagana',
    },
    select: {
      required: 'Musisz wybrać opcje',
    },
  },
};
