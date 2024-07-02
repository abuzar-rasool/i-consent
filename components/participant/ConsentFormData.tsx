import React from 'react';
import {
  ConsentForm,
  ParticipantResponse,
} from '@prisma/client';

interface ConsentFormDataProps {
  consentForm: ConsentForm;
  participantResponse: ParticipantResponse;
}

const ConsentFormContent: React.FC<ConsentFormDataProps> = ({
  consentForm,
  participantResponse
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatEnumValue = (value: string) => {
    return value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const makeCommaSeparatedString = (
    items: string[],
    conjunction: string,
    oxfordComma: boolean
  ): string => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;

    const lastItem = items[items.length - 1];
    const otherItems = items.slice(0, -1);
    return `${otherItems.join(', ')}${oxfordComma ? ',' : ''} ${conjunction} ${lastItem}`;
  };

  const getInstitutionFullNames = (institution: string | null) => {
    if (!institution) return 'Frankfurt University of Applied Sciences';
    if (
      institution.toLowerCase().includes('frauas') ||
      institution
        .toLowerCase()
        .includes('frankfurt university of applied sciences')
    ) {
      return 'Frankfurt University of Applied Sciences';
    }
    return institution;
  };

  const getInstitutionAddress = (institution: string | null) => {
    if (!institution) return 'Frankfurt University of Applied Sciences';
    if (
      institution.toLowerCase().includes('frauas') ||
      institution
        .toLowerCase()
        .includes('frankfurt university of applied sciences')
    ) {
      return (
        <>
          <p className="mb-2">Frankfurt University of Applied Sciences</p>
          <p className="mb-2">Nibelungenplatz 1</p>
          <p className="mb-2">60318 Frankfurt am Main, Germany</p>
        </>
      );
    }
    return <p className="mb-2">{institution}</p>;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 font-serif">
      <h1 className="text-2xl font-bold mb-4">
        Informed Consent of Study Participation
      </h1>

      <p className="mb-4">
        You are invited to participate in the {consentForm.researchType} "
        {consentForm.title}". The study is conducted by{' '}
        {consentForm.researcherNames} and supervised by{' '}
        {consentForm.principalInvestigator} from the{' '}
        {getInstitutionFullNames(consentForm.institution)}. The study with
        estimated {consentForm.participants} participants takes place in the
        period from {formatDate(consentForm.startDate)} to{' '}
        {formatDate(consentForm.endDate)}. Please note:
      </p>

      <ul className="list-disc pl-8 mb-4">
        <li>
          Your participation is entirely voluntary and can be discontinued or
          withdrawn at any time
        </li>
        <li>
          One session of the {consentForm.researchType} will last ca.{' '}
          {consentForm.duration} {consentForm.durationUnit}
        </li>
        <li>
          As compensation for your participation, you will receive{' '}
          {formatEnumValue(consentForm.compensation)}
        </li>
        <li>
          For the evaluation, we collect the following data:{' '}
          {consentForm.collectedData.map(formatEnumValue).join(', ')}
        </li>
        <li>
          Recordings and personal data are subject to the guidelines of the
          General Data Protection Regulation (GDPR) and will be{' '}
          {formatEnumValue(consentForm.anonymization)} anonymized (with a coded
          number) stored, evaluated, and potentially published so that without
          information from the researchers no conclusions can be drawn about
          individual persons
        </li>
        <li>
          The researchers also reserve the right to publish or use the the
          results form the data in some other study or academic article, not
          related with this research, however the data will be treated as
          mentioned in this form.
        </li>
      </ul>

      <p className="mb-4">
        The alternative to participation in this study is to choose not to
        participate. If you have any questions, concerns, or complaints about
        the informed consent process of this research study or your rights as a
        human research subject, please contact{' '}
        {consentForm.principalInvestigator}. Please read the following
        information carefully and take the time you need.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">
        1. Purpose and Goal of this Research
      </h2>
      <p className="mb-4">
        {consentForm.purpose} {consentForm.goal}
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">2. Study Participation</h2>
      <p className="mb-4">
        Your participation in this {consentForm.researchType} is entirely
        voluntary and can be discontinued or withdrawn at any time. You can
        refuse to answer any questions or continue with the study at any time if
        you feel uncomfortable in any way. You can discontinue or withdraw your
        participation at any time without giving a reason. However, we reserve
        the right to exclude you from the study (e.g., with invalid trials or if
        continuing the study could have a negative impact on your well-being or
        the equipment). You will not receive the compensation offered if you
        discontinue study participation.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">3. Study Procedure</h2>
      <p className="mb-4">
        After confirming this informed consent the procedure is as follows:
      </p>
      <ol className="list-decimal pl-8 mb-4">
        {consentForm.procedureSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="mb-4">
        The confirmation of participation in this study can be obtained directly
        from the researchers.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">4. Risks and Benefits</h2>
      <p className="mb-4">
        In the {consentForm.researchType} you will not be exposed to any
        immediate risk or danger. As with all computer systems on which data is
        processed, despite security measures, there is a small risk of data
        leakage and the loss of confidential or personal information. As
        compensation for your participation, you will receive{' '}
        {formatEnumValue(consentForm.compensation)}. With your participation you
        support our research work and contribute to a better understanding of
        human-computer interaction.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">
        5. Data Protection and Confidentiality
      </h2>
      <p className="mb-4">
        In this study, personal data are collected for our research. The use of
        personal or subject-related information is governed by the European
        Union (EU) General Data Protection Regulation (GDPR) and will be treated
        in accordance with the GDPR. This means that you can view, correct,
        restrict processing, and delete the data collected in this study. Only
        with your agreement, we will collect the following data:{' '}
        {consentForm.collectedData.map(formatEnumValue).join(', ')}. We plan to
        publish the results of this and other research studies in academic
        articles or other media as {formatEnumValue(consentForm.publication)}.
        Your data will not be retained for longer than necessary or until you
        contact researchers to have your data destroyed or deleted. Access to
        the raw data, transcribed interviews, and observation protocols of the
        study is encrypted, password-protected and only accessible to the
        authors, colleagues and researchers collaborating on this research.
        Other members and administrators of our institution do not have access
        to your data. When publishing, the data will be{' '}
        {formatEnumValue(consentForm.anonymization)} anonymized using code
        numbers and published in aggregated form, so that without information
        from the researchers no conclusions can be drawn about individual
        persons. Any interview content or direct quotations from the interview,
        that are made available through academic publications or other academic
        outlets will also be anonymized using code numbers. Contact details
        (e.g. e-mails) will not be passed on to third parties, but may be used
        by the researchers to contact participants, trace infection chains, or
        to send you further details of the study. According to the GDPR, the
        researchers will inform the participants using their contact details if
        a confidential data breach has been detected.
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">
        6. Identification of Investigators
      </h2>
      <p className="mb-4">
        If you have any questions or concerns about the research, please feel
        free to contact:
      </p>
      <p className="mb-2">
        <strong>Researchers</strong>
      </p>
      <ul className="list-none mb-4">
        {consentForm.researcherNames?.split(', ').map((name, index) => (
          <li key={index}>
            {name} ({consentForm.researcherEmails?.split(', ')[index]})
          </li>
        ))}
      </ul>
      {getInstitutionAddress(consentForm?.institution)}
      <p className="mb-2">
        <strong>Principal investigator</strong>
      </p>
      <p className="mb-2">{consentForm.principalInvestigator}</p>
      <p className="mb-2">{consentForm.principalInvestigatorEmail}</p>
      {getInstitutionAddress(consentForm.institution)}
    </div>
  );
};

export default ConsentFormContent;
