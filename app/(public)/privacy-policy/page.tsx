import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: "Mobavenue - Privacy Policy",
    description: "Mobavenue DSP privacy policy page"
}

export default function page() {
    return (
        <Card className='m-5 px-4'>
            <CardHeader className='flex flex-row justify-between items-center border-b'>
                <CardTitle>
                    <Image
                        src={Mobavenue_Logo}
                        width="0"
                        height="0"
                        alt="Mobavenue_logo"
                        priority
                        style={{ width: '100%', height: 'auto' }}
                    />
                </CardTitle>
                <CardDescription className=' flex gap-4'>
                    <Button type='button'>
                        About Us
                    </Button>
                    <Button type='button'>
                        Contact Us
                    </Button>
                </CardDescription>
            </CardHeader>
            <CardContent className='mt-4 text-sm text-slate-600'>
                <div className='text-3xl font-bold'>Privacy Policy</div>
                <div className='text-sm font-semibold italic mt-2'>Last updated: January 06, 2023.</div>

                <div className='mt-5'>
                    <span className='font-bold'>Your privacy is important to Mobavenue Pte Ltd</span> (hereinafter “the Company”). This statement outlines Company policy on how we collect personal information and how we maintain, use, store and disclose the personal information we hold and reflects our commitment to you. Mobavenue Pte Ltd (“we” or “our”) is the owner, author and publisher of www.mobavenue.com (“Website”) which lists and permits transactions in relation to Service (“Service(s)”). All visitors of the Website are together termed as <span className='font-bold'>“you”</span> or <span className='font-bold'>“Users”</span>. It applies to all operations within the Company, including visitors to our Websites.
                </div>

                <div className='mt-3'>
                    We desire a long-term relationship with you and respect the trust that you place in us while you interact with us. In keeping with the requirements of applicable law including Section 43A of the Information Technology Act, 2000, Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “<span className='font-bold'>SPI Rules</span>”) and Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011, this comprehensive privacy policy has been prepared to outline everything you need to know about the kind of information collected by us from you about you and/or about the end users of the Services, our commitment to protecting such information in the course of our interaction with you and the conditions under which we may have to disclose such information (“Privacy Policy”).
                </div>

                <div className='mt-3'>
                    By visiting this Website you agree to be bound by the terms and conditions of this Privacy Policy and consent to our use and disclosure of your personal information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy please do not use or access our Website. This Privacy Policy is incorporated into and subject to the Terms of Use. Any capitalized term used but not defined in this Privacy Policy shall have the meaning specified in the Terms of Use.
                </div>

                <div className='mt-3'>
                    If you use this Website on behalf of a third party you represent, it would mean that you are authorised to accept the terms of this Privacy Policy on such person’s behalf.
                </div>
                <div className='mt-3'>
                    The Company privacy policy will be reviewed and updated from time to time to take account of new laws and technology, changes to our operations and practices and to make sure it remains appropriate to the changing environment. Please regularly check our privacy policy so that you are aware of these updates and changes. Any information we hold will be governed by the most current version of the Company privacy policy.
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>A. The Company privacy policy is based on transparency</span>
                    <div className='mt-1 px-5'>We are committed to being open and transparent about how we manage personal information.</div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>B. Types of data and information held by Company and when and how it is collected</span>
                    <div className='mt-1 px-5'> <span className='font-bold'>1. Sensitive Personal Data or Information (“SPDI”)</span></div>
                    <div className='my-1 px-5'>SPDI is a special category of personal information defined under Section 43A of the Act and the Privacy Rules framed there under that could be used for the purpose of identifying you or to form an opinion about you. SPDI is such personal information which consists of information relating to:</div>
                    <div className='px-10'>1. Password.</div>
                    <div className='px-10'>2. Financial information such as bank account or credit card or debit card or other payment instrument details.</div>
                    <div className='px-10'>3. Sexual orientation, preferences or practices.</div>
                    <div className='px-10'>4. Any detail relating to the above information as provided to us by you for providing service.</div>
                    <div className='my-1 px-5'>
                        any of the information received above by a body corporate for processing, whether stored or processed under lawful contract or otherwise:
                        As outlined under the Act and the Privacy Rules, your personal information and/or SPDI can only be collected, handled, processed or stored by us and / or disclosed to / shared with third party(ies) only after obtaining your prior written consent. However, the Act read with the Privacy Rules provide for the following circumstances in which we may not obtain your consent while collecting, handling, processing or storing your personal information and / or while disclosing your personal information to a third party:
                    </div>
                    <div className='px-10'>1. Where your personal information is freely available or accessible in public domain or is furnished under the Right to Information Act, 2005 or any other law for the time being in force as the same would not be regarded as personal information / SPDI for the purposes of the Privacy Rules;</div>
                    <div className='px-10'>2. Where your personal information is disclosed to any third party by an order under the law for the time being in force; and</div>
                    <div className='px-10'>3. Where your personal information is disclosed to the Indian Government agencies mandated under the law to obtain such information for the purpose of verification of your identity, or for prevention, detection, investigation including cyber incidents, prosecution, and punishment of offences.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>C. Collection</span>
                    <div className='my-1 px-5'>
                        1. The information gathered by Mobavenue from the Site is either information voluntarily supplied by Site users or tracking information gathered as users navigate through the Site. In these instances, Mobavenue is considered a data controller of this information. In addition, when you use the Services as a demand partner or supply partner, Mobavenue collects Personal Information about your end users in order to provide you with the
                    </div>
                    <div className='my-1'>
                        When you request information about our Services, you must submit your name and email address. In addition, you may insert the reason for your communication. We will use this Personal Information to:
                    </div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>Determine whether you are an existing client of Mobavenue;</li>
                            <li>Send you the material you have requested;</li>
                            <li>Assist you in the completion of your application;</li>
                            <li>Assess your eligibility for any requested service;</li>
                            <li>Assess your eligibility for any requested service</li>
                            <li>Responding to your inquiries about accounts and other services; and</li>
                            <li>Making proposals for future service needs.</li>
                        </ul>
                    </div>
                    <div className='mt-3 mb-1 px-5'>
                        2. We may collect, handle, process or store personal information and /or SPDI about you when:
                    </div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>You complete registration at our website or provide any other information in connection with your query;</li>
                            <li>We receive any reference about you;</li>
                            <li>We receive any information about any insurance investigation, litigation, registration or professional disciplinary matter, criminal matter, inquest or inquiry in which you were involved;</li>
                            <li>You provide us with any additional information about you.</li>
                            <li>We will retain your Personal Information for the amount of time necessary in order to process your inquiries and respond to your requests. If we have not received a communication from you within 9 months, or you have asked to delete your Personal Information, we shall immediately delete records of your Personal Information.</li>
                        </ul>
                    </div>

                    <div className='mt-3 mb-1 px-5'>
                        3. Information when you use the Services.
                    </div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>When you use the Services as a demand partner or supply partner, Mobavenue collects Personal Information about your end users in order to provide you with the services. The following end user Personal Information that we collect is:</li>
                            <li>Mobile Advertising ID for Services performed via a mobile device;</li>
                            <li>IP address.</li>
                            <li>We may also collect other non-Personal Information in providing the Services including:</li>
                            <li>Device make, model and operating system;</li>
                            <li>Device properties related to screen size & orientation, audio volume and battery;</li>
                            <li>Carrier;</li>
                            <li>Operating system;</li>
                            <li>Name and properties of mobile application through which a consumer interacts with the Services;</li>
                            <li>Country, time zone and locale settings (country and preferred language);</li>
                            <li>Network connection type and speed; and</li>
                            <li>Activity of a user on an application following installation; and</li>
                            <li>Internet browser user-agent used to access the Services.</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>D. General information collected from visitors to our website</span>
                    <div className='mt-1 px-5'>
                        We gather personal information and / or SPDI about all our website users collectively, such as what areas users visit more frequently and what services users access the most. This information helps us determine what is most beneficial for our users, and how we can continually create a better overall website experience for you.
                    </div>
                    <div className='mt-1 px-5'>
                        When you use or transact on our website, we collect Personal Information about you periodically. The objective really is to give a seamless, safe and a personalised experience which will make you using our website a pleasant experience. Also we do need some personal information that is essential in order to execute the orders that you place on our site
                    </div>
                    <div className='mt-1 px-5'>
                        All your information is maintained by Mobavenue in electronic form on its equipment, and on the equipment of its employees. User information may also be converted to physical form from time to time. Mobavenue makes all User information accessible to its employees only on a need-to-know basis, and binds all such employees to strict confidentiality obligations.
                    </div>
                    <div className='mt-1 px-5'>
                        If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the Website, we may collect such information into a file specific to you.
                    </div>
                    <div className='mt-1 px-5'>
                        In our efforts to continually improve our service offerings, we collect and analyse demographic and profile data about our users’ activity on our Website.
                    </div>
                    <div className='mt-1 px-5'>
                        We will occasionally ask you to complete optional online surveys. These surveys may ask you for contact information and demographic information (like zip code, age, or income level). We use this data to tailor your experience at our Website, providing you with content that we think you might be interested in and to display content according to your preferences.
                    </div>
                    <div className='mt-1 px-5'>
                        We use your personal information to resolve disputes; troubleshoot problems; help promote a safe service; collect money; measure consumer interest in our services, inform you about online and offline offers, services, and updates; customize your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; and as otherwise described to you at the time of collection.
                    </div>
                    <div className='mt-1 px-5'>
                        Notwithstanding the above, Mobavenue shall not be responsible for any breach of security or for any actions of any third parties that receive Users’ personal data or events that are beyond the reasonable control of Mobavenue including, acts of government, computer hacking, unauthorised access to computer data and storage devices, computer crashes, breach of security and encryption, poor quality of internet service or telephone service etc.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>E. Tracking Information when users navigate the Site</span>
                    <div className='ml-3 mt-2 font-bold'>Cookies</div>
                    <div className='mt-1 px-5'>
                        We use data collection devices such as “cookies” on certain pages of the Website to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. “Cookies” are small files placed on your hard drive that assist us in providing our services. A “cookie” is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. We place both permanent and temporary cookies in your computer’s hard drive. In the course of serving advertisements or optimizing services to its Users, Mobavenue may allow authorized third parties to place or recognize a unique cookie on the User’s browser. The cookies do not contain any of your personally identifiable information.
                    </div>
                    <div className='mt-1 px-5'>
                        We offer certain features that are only available through the use of a “cookie”. We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are “session cookies,” meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline our cookies if your browser permits, although in that case you may not be able to use certain features on the Website and you may be required to re-enter your password more frequently during a session.
                    </div>
                    <div className='mt-1 px-5'>
                        Additionally, you may encounter “cookies” or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties.
                    </div>

                    <div className='ml-3 mt-2 font-bold'>Web Beacons</div>
                    <div className='mt-1 px-5'>
                        The Site may also use web beacons (including web beacons supplied or provided by third parties) alone or in conjunction with cookies to compile information about users’ usage of the Site and interaction with e-mails from Mobavenue. Web beacons are clear electronic images that can recognize certain types of information on your computer, such as cookies, when you viewed a particular Site tied to the web beacon, and a description of a Site tied to the web beacon. We use web beacons to operate and improve the Sites and e-mail communications. We may use information from web beacons in combination with other anonymous data we have about our clients to provide you with information about Mobavenue and our services. We will conduct this review on an anonymous basis.
                    </div>

                    <div className='ml-3 mt-2 font-bold'>Banking and credit card information</div>
                    <div className='mt-1 px-5'>
                        Mobavenue may require the User to pay with a credit card, wire transfer, debit card or cheque/cash. Mobavenue will collect such User’s credit card number and/or other financial institution information such as bank account numbers and will use that information for the billing and payment processes, including but not limited to the use and disclosure of such credit card number and information to third parties as necessary to complete such billing operation. Verification of credit information, however, is accomplished solely by the User through the authentication process. User’s credit card/debit card details are transacted upon secure sites of approved payment gateways which are digitally under encryption, thereby providing the highest possible degree of care as per current technology. However, Mobavenue provides you an option not to save your payment details. User is advised, however, that internet technology is not full proof safe and User should exercise discretion while using the same.
                    </div>

                    <div className='ml-3 mt-2 font-bold'>Choice/Opt-Out</div>
                    <div className='mt-1 px-5'>
                        We use personal information to provide the services you request. To the extent we use your personal information to market to you, we will provide you the ability to opt-out of such uses. We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from us on behalf of our partners, and from us in general, after setting up an account.
                    </div>
                    <div className='mt-1 px-5'>
                        If you want to remove your contact information from all www.mobavenue.com lists and newsletters, please contact us.
                    </div>

                    <div className='ml-3 mt-2 font-bold'>Links to Other Sites</div>
                    <div className='mt-1 px-5'>
                        Our Website may link you to other websites that may collect personally identifiable information about you. www.mobavenue.com is not responsible for the privacy practices or the content of those linked websites.
                    </div>

                    <div className='ml-3 mt-2 font-bold'>Security Precautions</div>
                    <div className='mt-1 px-5'>
                        Our Website has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to strict security guidelines, protecting it against unauthorized access.
                    </div>

                    <div className='ml-3 mt-2 font-bold'>Your Consent</div>
                    <div className='mt-1 px-5'>
                        By using the Website and/ or by providing your information, you consent to the collection and use of the information you disclose on the Website in accordance with this Privacy Policy, including but not limited to Your consent for sharing your information as per this Privacy Policy.
                    </div>
                    <div className='mt-1 px-5'>
                        If we decide to change our privacy policy, we will post those changes on this page so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>F. Purposes and use for which we collect personal information</span>
                    <div className='my-1 px-5'>1. Your personal information / SPDI may be used in connection with:</div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>Our management and resolution of any complaint, inquiry or investigation in which you are involved</li>
                            <li>Any insurance claim or proposal that requires disclosure of your personal or sensitive information</li>
                            <li>Undertaking criminal reference and other background checks</li>
                            <li>For research, development, business systems and infrastructure testing, and other business purposes to assist us in providing our services to you.</li>
                        </ul>
                    </div>
                    <div className='my-1 px-5'>2. When you register to proceed with the Services, we ask you for your name, your position and the organization you work for, e-mail address, country, postcode, telephone number, billing address or payment details. We use this information to:</div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>Provide and maintain the Service to you, including performing payment processing operations (through third party service providers)</li>
                            <li>Renewal of the Service</li>
                            <li>Establish and maintain communications with you and other users</li>
                            <li>Making proposals for future service and product needs</li>
                            <li>Allowing our affiliated companies to notify you of certain products or services they offer.</li>
                            <li>Mobavenue may use its personally identifiable information and non-personal information (information together) for any legally acceptable purpose, including but not limited to the following</li>
                            <li>Information sharing with affiliate companies. This Privacy Policy does not apply to affiliated companies and their collection, use and exchange of information</li>
                            <li>Using third-party service providers to enhance the platform with additional pocket services</li>
                            <li>Sharing information with various third-party vendors that are not part of Pocket (or its affiliates).</li>
                        </ul>
                    </div>
                    <div className='my-1 px-5 font-bold'>Additionally,</div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>Mobavenue use this information to find and serve the optimal advertisement for the end user of your mobile website or application (the “Property”). In addition, Mobavenue passes this information on to the Advertiser’s tracking vendor for tracking purposes so that an install event can be detected. Please note that Mobavenue only collects information from the Property to the extent that you have instructed and allowed Mobavenue to collect, in writing, prior to such collection, and subject to the permissions you have activated inside the Property.</li>
                            <li>Mobavenue uses this information to facilitate and optimize campaigns for advertisers across its network. It only uses the Personal Information provided by a demand partner to optimize campaigns for this demand partner – Mobavenue does not cross-use Personal Information received from one advertiser to optimize the campaigns of another advertiser. Mobavenue will receive data from your tracking vendor on whether an event which triggers payment to Mobavenue or measures quality of the installs provided by Mobavenue has occurred on a Property. This is so we can serve your advertisement on the Properties of our supply partners and pay them for certain events agreed between us (eg. installs, certain interactions on a Property etc.).</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>G. Disclosures</span>
                    <div className='my-1 px-5'>We may disclose your personal information (including to trusted third parties) for the purposes for which it is primarily held or for a related secondary purpose and in some cases we may only disclose information with your consent (unless already granted). Your personal and sensitive information may be disclosed to:</div>
                    <div className='px-10'>
                        <ul className='list-decimal'>
                            <li>Potential and actual clients of Company and trusted third parties</li>
                            <li>Our insurers</li>
                            <li>A professional association or registration body that has a legitimate interest in the disclosure of your personal and sensitive information</li>
                            <li>Any person with a lawful entitlement to obtain the information.</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>H. Management of personal information</span>
                    <div className='my-1 px-5'>At Company, we train our staff to respect the confidentiality of customer information and the privacy of individuals. Company regards breach of your privacy very seriously and any breach will result in disciplinary action being taken, dependent upon severity. Company has appointed a Privacy Officer to ensure that our management of personal information and / or SPDI is in accordance with this policy and the relevant Act. As per the requirements of the Privacy Rules, Company has designated a Grievance Officer to redress your complaints, if any, with respect to processing of information in a time bound manner. The Grievance Officer shall endeavour to redress your complaints expeditiously within one month from the date of receipt of any communication in this regard from you.</div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>I. How do we store and protect personal information?</span>
                    <div className='my-1 px-5'>
                        Safeguarding the privacy of your information is important to us, whether you interact with us personally, by phone, mail, over the internet or other electronic medium and ensure implementing reasonable security practices and procedures to protect your personal information/SPDI. We will provide you the name of the agency(ies) who may maintain, handle or store your personal information / SPDI as service provider on our behalf. We and / or through our service provider shall hold personal information/ SPDI in a combination of secure computer storage facilities and paper-based files and other records, and take such steps as are reasonable in the circumstances to protect the personal information/ SPDI we hold from misuse, interference and loss, unauthorised access, modification or disclosure. We may need to maintain records for a significant period of time. However, when we consider information is no longer needed, we will remove any details that will identify you or we will securely destroy the records.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>J. How do we keep personal information accurate and up to date?</span>
                    <div className='my-1 px-5'>
                        Company takes such steps as are reasonable in the circumstances to ensure that the personal information it holds and discloses is accurate, up to date and complete. We recognise that information changes frequently with changes of address and other personal circumstances. Please advise the Company when your personal details change. Any change in your personal information / SPDI shall be updated by us after obtaining the same from you in writing.
                    </div>
                    <div className='my-1 px-5'>
                        If you have created a profile with Company via our website, you are able to review and edit your personal information at any time by logging into your account and reviewing your profile. You can delete your personal information or close your account by contacting the Privacy Officer. If you do choose to close your account with Company, Company may retain personal information from your account as and where required by law.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>K. Enquiries & complaints</span>
                    <div className='my-1 px-5 font-bold'>
                        Complaints
                    </div>
                    <div className='my-1 px-5'>
                        We aim to acknowledge receipt of all complaints within 15 working days, and aim to resolve all complaints within one month from the date of receipt of such complaint. This may not be possible in all circumstances depending on the contents of the complaint. In this situation, we will respond to your complaint in a reasonable time. If you are not satisfied with our response to your complaint, you may take recourse to redress your complaint as per the mechanism provided under the Act.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>L. Access and Your Rights</span>
                    <div className='my-1 px-5'>
                        Mobavenue does not provide online access to its customers to view or amend personal information in its database, however, you have the right to ask us to do any amendment in any personal information we hold about you if it is inaccurate or misleading. We also note that our knowing about changes to some of your Personal Information, (e.g. email address) may be key to effectively communicating with you at your request so we encourage you keep us informed of changes to your Personal Information. To update your details, please contact us by email at <a className="text-blue-800" href="mailto:privacyprotection@mobavenue.com">privacyprotection@mobavenue.com</a> or at the following address:
                    </div>
                    <div className='my-1 px-5'>
                        Mobavenue Pvt Ltd.
                    </div>
                    <div className='my-1 px-5'>
                        Attn: Customer Care
                    </div>
                    <div className='my-1 px-5'>
                        1404,Gold Crest Business Center, Lokmanya Tilak Rd, Maharashtra Nagar, Borivali, Mumbai, Maharashtra 400091
                    </div>
                    <div className='my-1 px-5'>
                        The following rights (which may be subject to certain exemptions or derogations), shall apply in addition to the above to EU users of the Site or the Services:
                    </div>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>
                                If you no longer want us to use your Personal Information, you can request that we erase your Personal Information. Please note that if you request the erasure of your Personal Information, we will not be able to process your transactions or provide you with the Services. We may retain some of your Personal Information as necessary for our legitimate business interests, such as fraud detection and prevention and enhancing safety. For example, if we suspend use for fraud or safety reasons, we may retain certain information about that user from processing another transaction through the Site and the Service. We may also retain and use your Personal Information to the extent necessary to comply with our legal obligations, including for tax, legal reporting and auditing obligations. Also, because we maintain the Site and the Service to protect from accidental or malicious loss and destruction, residual copies of your Personal Information may not be removed from our backup systems for a limited period of time.
                            </li>
                            <li>
                                You have a right to restrict the processing of your Personal Information, for example in case when we no longer need your Personal Information for the initial purposes for which they were collected, but they are required by you for the establishment, exercise or defense of legal claims.
                            </li>
                            <li>
                                Where you have provided your consent to the processing of your Personal Information by Mobavenue you may withdraw your consent at any time by sending a communication to us specifying which consent you are withdrawing. Please note that the withdrawal of your consent does not affect the lawfulness of any processing activities based on such consent before its withdrawal.
                            </li>
                            <li>
                                You have a right to object to our use of your Personal Information for direct marketing purposes. See the explanation of “Cookies” above for how to unsubscribe, manage your marketing preferences and opt out of cookies.
                            </li>
                            <li>
                                You have a right to obtain a portable copy of Personal Information which is processed on the basis of your consent, or which is necessary for the performance of a contract between us.
                            </li>
                            <li>
                                You have a right to have such portable copy of Personal Information transferred to another data controller in a structured, commonly used and machine-readable format.
                            </li>
                            <li>
                                You also have a right to request details of the basis on which your Personal Information is transferred outside the European Economic Area, but you acknowledge that data transfer agreements may need to be partially redacted for reasons of commercial confidentiality.
                            </li>
                            <li>
                                You have a right to lodge a complaint with your local supervisory authority if you have concerns about how we are processing your Personal Information. We ask that you please attempt to resolve any issues with us first, although you have a right to contact your supervisory authority at any time.
                            </li>
                        </ul>
                    </div>
                    <div className='my-1 px-5'>
                        We may ask you for additional information to confirm your identity and for security purposes, before disclosing the Personal Information requested to you. We reserve the right to charge a fee where permitted by law, for instance if your request is manifestly unfounded or excessive.
                    </div>
                    <div className='my-1 px-5'>
                        You can exercise your rights by contacting us. Subject to legal and other permissible considerations, we will make every reasonable effort to honor your request promptly or inform you if we require further information in order to fulfil your request.
                    </div>
                    <div className='my-1 px-5'>
                        In the event that your request, for example, would impact the duty of confidentiality we owe to others, or if we are legally entitled to deal with your request in a different way than initially requested, we will address your request to the maximum extent possible, all in accordance with applicable law.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>M. Feedback</span>
                    <div className='my-1 px-5'>
                        Company has several areas on our website where you can submit feedback, under the ‘contact us’ section. Any feedback that is submitted through this area becomes the property of Company. We may use this feedback, such as success stories or responses to surveys, for marketing purposes, or to contact you for further feedback on the site.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>N. Contact us</span>
                    <div className='my-1 px-5'>
                        If you have any questions, concerns or complaints regarding our compliance with this Privacy Policy, or if you wish to exercise your rights, we encourto notiyou to first contact us at <a className="text-blue-800" href="mailto:privacyprotection@mobavenue.com">privacyprotection@mobavenue.com</a>. You can also contact us at the following address:
                    </div>
                    <div className='my-1 px-5'>
                        Mobavenue Pvt Ltd.
                    </div>
                    <div className='my-1 px-5'>
                        Attn: Customer Care
                    </div>
                    <div className='my-1 px-5'>
                        111, 1st floor, Western Edge 2, Western Express Highway, Magathane, Food Corporation of India Warehouse, Borivali East, Mumbai - 400066
                    </div>
                    <div className='my-1 px-5'>
                        We will investigate and attempt to resolve complaints and disputes and will make every reasonable effort to honor your wishes to exercise your rights as quickly as possible and in any event, within the timescales provided by data protection laws.
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
