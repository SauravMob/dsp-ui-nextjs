import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

export default function TNCModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-transparent text-black-900 font-medium mx-0 px-1' variant={"link"} size="sm">Terms and conditions</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-xl max-h-dvh overflow-y-scroll text-sm">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogDescription>
            Updated: January 06, 2020.
          </DialogDescription>
        </DialogHeader>
        <div>
          THIS AGREEMENT SHALL GOVERNS YOUR PARTICIPATION AND USE OF THE MOBAVENUE SERVICE.
        </div>
        <div className='mt-50'>
          BY ACCEPTING THIS AGREEMENT, EITHER BY CLICKING A BOX INDICATING YOUR ACCEPTANCE OR BY ACCESSING OR REGISTERING OR USING THE MOBAVENUE SERVICE, THE ADVERTISER AGREE TO BOUND BY THE MOBAVENUE TERMS AND CONDITIONS.
        </div>
        <div className='mt-50'>
          This terms of use agreement (the “terms of use”) sets forth the standards of use of the website www.mobavenue.com (the “site”), as well as the legal agreement between Mobavenue media private limited (“mobavenue” or “us”), and the customers of this site or of the services provided by mobavenue (the “user”) and mobile application publishers ( the “publishers” ). Mobavenue media private limited is an Indian company with registered office in 304, Shreeram Jairam CHS S.V. Road Kandivali west Mumbai-400067 India.
        </div>
        <div className='mt-50'>
          The use of this site entails full acceptance of the terms of use as published by Mobavenue at the moment of such use. If you do not agree with the terms of use, you should immediately cease all usage of this website.These terms of use govern using of www.mobavenue.com. By using Mobavenue services user accepts these terms of use in full and with no exceptions and agree to comply with them.
        </div>
        <div className='mt-50'>
          Please read these terms of use carefully before using the services. By accessing this site or using any part of the site or any content or services on the site, you agree to become bound by these terms and conditions.
        </div>
        <div className='mt-50'>
          If user disagrees with any of the following terms and conditions, one should refrain from using the website.
        </div>
        <div className='mt-1'>
          <strong>1. General Provisions</strong>
        </div>
        <div className='mt-50 ml-1'>
          1.1. Mobavenue offers Users the opportunity to use its Services on the terms and provisions provided hereunder. The use of Mobavenue services shall be regulated by this Terms of Use and <a target="_blank" href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className='mt-50 ml-1'>
          1.2. By starting the use of any services/certain functions or going through the registration procedure, the User shall be deemed to have accepted the terms of this Terms of Use in full without any limitations or exceptions.
        </div>
        <div className='mt-50 ml-1'>
          1.3. Mobavenue reserves the right to change the following Terms of Use at any time without prior User notice. The changes take effect upon disposal on the Mobavenue website <a target='_blank' href="https://www.mobavenue.com">www.mobavenue.com</a>.
        </div>
        <div className='mt-1'>
          <strong>2. User Registration</strong>
        </div>
        <div className='mt-50 ml-1'>
          2.1. To use certain Mobavenue Services or certain specific functions of services, the User shall complete registration to create a unique account. You must accurately complete the application to become an affiliate (and provide us with future updates) and not use any aliases or other means to mask your true identity or contact information.
        </div>
        <div className='mt-50 ml-1'>
          2.2. Upon registration the User shall provide valid and complete information requested in the registration form and shall regularly update such information. If the User provides invalid information or Mobavenue has reasons to believe that any information provided by the User is incomplete or invalid, Mobavenue may at its discretion block or delete the User’s account or deny the User the use of any services (or certain functions).
        </div>
        <div className='mt-50 ml-1'>
          2.3 After we review your application, we will notify you of your acceptance or rejection to the Affiliate Program, generally within two (2) business days. We may accept or reject your application at our sole discretion for any reason
        </div>
        <div className='mt-50 ml-1'>
          2.4. Mobavenue shall reserve the right to require at any time that the User verify the information provided upon registration and to request supporting documents.
        </div>
        <div className='mt-50 ml-1'>
          2.5. For security purposes, the Publisher cannot make any changes in its payment information without Mobavenue support approval.
        </div>
        <div className='mt-50 ml-1'>
          2.6. Any personal information of the User contained in the User account shall be stored and processed by Mobavenue according to <a target="_blank" href="/privacy-policy">Privacy Policy</a>.
        </div>
        <div className='mt-50 ml-1'>
          2.7. The User shall promptly inform Mobavenue of any instances of unauthorized (not allowed by the User) access to Mobavenue Services through the User’s account and/or any breach (alleged breach) of confidentiality of the chosen means of access to his/her account.
        </div>
        <div className='mt-50 ml-1'>
          2.8. Mobavenue may disable or delete the User’s account as well as prohibit access through any account to certain Services and delete any content without giving reasons including in case the User violates the terms hereunder.
        </div>
        <div className='mt-1'>
          <strong>3. General Terms of Use</strong>
        </div>
        <div className='mt-50 ml-1'>
          3.1. The User agrees not to reproduce, copy, sell or use for commercial purposes any parts of the Services, not to access (or attempt to access) any of the Services by any means other than through the interface that is provided by Mobavenue.
        </div>
        <div className='mt-50 ml-1'>
          3.2. The User agrees to refrain from trying to crack any of Mobavenue’s software or data or to decompile the Mobavenue software source codes used in the Services with the intention to install it on his/her PC, phone, pocket PC or other electronic device.
        </div>
        <div className='mt-50 ml-1'>
          3.3. The User shall be responsible for compliance of any Content posted by the User with applicable legal requirements including responsibility to third parties in case posting by the User of any Content or its subject matter infringes on rights and legitimate interests of third parties including personal non-property rights of authors, any other intellectual property rights of third parties and/or encroaches on other intangible assets.
        </div>
        <div className='mt-50 ml-1'>
          3.4. The User is expressly prohibited from using any means, devices or arrangements to commit fraud, violate any applicable law, interfere with other affiliates or falsify information in connection with the Services or exceed your permitted access to Mobavenue Services. In the event of fraud, Mobavenue has the right at its discretion to block and/or delete the User’s account or deny the User the use of any services (or certain functions) as well as to annul the income received.
        </div>
        <div className='mt-1'>
          <strong>4. Payment Terms</strong>
        </div>
        <div className='mt-50 ml-1'>
          4.1. Mobavenue shall pay the Publisher a revenue share (the “Royalty”) ( please mention amount ) percent (number%) of the Net Advertising Sales Revenue for Ads that run on the Mobavenue Networks. The Royalty shall be paid to Publisher/Developer by Mobavenue no later than Sixty (60) days after submission of invoice. Such payment shall reflect information displayed in the Mobavenue Online Interface. This information shall include
        </div>
        <div className='mt-50 ml-3'>
          1. The Royalty paid
        </div>
        <div className='mt-25 ml-3'>
          2. The figures supporting such calculation on a per Advertisement basis, including Impressions & Success delivered, Click-Through Rates, CPM/CPA/CPI/CPL/CPS and Royalty amounts (as applicable and available)
        </div>
        <div className='mt-25 ml-3'>
          3. Kind of Advertising placed.
        </div>
        <div className='mt-25 ml-3'>
          4. Cost of the Advertising campaigns request sent to the servers. For the avoidance of doubt, the revenue share / Royalty working shall be as per the Mobavenue MIS as per the url, user id, password shared with the publisher/developer by Mobavenue.
        </div>
        <div className='mt-50 ml-1'>
          4.2. All statistic for the purpose of billing and delivery reporting are based on the Mobavenue’s reporting system.
        </div>
        <div className='mt-50 ml-1'>
          4.3. For Publishers there are many business models like CPA/CPI/CPL/CPS/CPM. Rates depend, according to subscription Plan.
        </div>
        <div className='mt-50 ml-1'>
          4.4. Mobavenue provides the ability to perform payments by using payment service providers. Advertiser shall have the right to select any payment service provider available. You agree that Mobavenue is not responsible for any actions applied by the payment service provider including but not limited to any additional transaction fees, banking commissions or currency fees applied to your transaction.
        </div>
        <div className='mt-50 ml-1'>
          4.5. The Users is responsible for all applicable taxes associated with provided ad services, other than taxes based on Mobavenue income. The Users shall indemnify Mobavenue against all losses suffered or incurred by Mobavenue arising out of or in connection with any payment made to Mobavenue.
        </div>
        <div className='mt-50 ml-1'>
          4.6. Publisher is responsible to supply valid payment details in personal account of Mobavenue Service, if details are wrong or if the Publisher changed its payment details, it is the Publisher’s responsibility to notify Mobavenue via email 14 days before payment due date.
        </div>
        <div className='mt-1'>
          <strong>5. Ad standards</strong>
        </div>
        <div className='mt-50 ml-1'>
          Mobavenue, at its own discretion, may refuse to run any ad or campaign if it determines that such ad or campaign does not comply with Mobavenue ad quality standards, mobile advertising good practices or applicable regulations, or would otherwise be inappropriate or damaging to Mobavenue or its partners.
        </div>
        <div className='mt-1'>
          <strong>6. Publisher Requirements</strong>
        </div>
        <div className='mt-50 ml-1'>
          6.1. Publisher acknowledges and agrees to provide its Websites and mobile applications that are in compliant with all applicable law in order to use Mobavenue Services.
        </div>
        <div className='mt-50 ml-1'>
          6.2. Publisher agrees that the content of Publisher’s Website shall be appropriate and legal, and shall not contain:
        </div>
        <div className='mt-50 ml-3'>
          6.2.1. Infringe the intellectual property rights, rights of privacy or any other rights whatsoever of any third party.
        </div>
        <div className='mt-25 ml-3'>
          6.2.2. Malware, materials containing viruses or other computer codes, files or programs designed to breach, destroy or limit the operation of any computer or telecommunication equipment or software.
        </div>
        <div className='mt-25 ml-3'>
          6.2.3. Materials, that promote provocative agenda, violence, racial, national, Political, religion intolerance, or advocacy against any individual, group, or organization. The call for change the political system of a sovereign state, participation in terrorist organizations.
        </div>
        <div className='mt-25 ml-3'>
          6.2.4. Materials, that promote drugs, or any related paraphernalia, weapons and other prohibited and illegal goods or services, etc.
        </div>
        <div className='mt-50 ml-1'>
          6.4. Mobavenue reserve right to reject any Ads on their sole discretion if such Ads violate applicable laws, this Terms of Use, or violate or may violate rights of third party.
        </div>
        <div className='mt-50 ml-1'>
          6.5. No traffic directly to the traffic back lending page. In the event of the discovery of the damage described in clause 6.4, the funds that were charged to the Publisher’s balance on the income from the back-up traffic will be cancelled and in that case no refund will be made to Publisher and all the amount will be forfeited.
        </div>
        <div className='mt-50 ml-1'>
          6.6. Mobavenue is obliged and shall has right to check any of the Publisher’s Websites before using through Mobavenue Services.
        </div>
        <div className='mt-50 ml-1'>
          6.7. Publisher’s websites should have SSL certificates.
        </div>
        <div className='mt-1'>
          <strong>7. Representation and Warranties</strong>
        </div>
        <div className='mt-50 ml-1'>
          7.1. The implementation of this Agreement by such party and the execution by such party of its binding obligations and duties to the extent set forth hereunder do not and will not violate any agreement to which it is a party or by which it is otherwise bound.
        </div>
        <div className='mt-50 ml-1'>
          7.2. Both Publisher and Advertiser have the right, power and authority to enter into this agreement and grants the rights specified in this Terms of Use.
        </div>
        <div className='mt-50 ml-1'>
          7.3. Hereby the User represent and warrant that he/she has all necessary rights, permits and licenses to start and manage ad campaigns and for display Advertisement and operate websites and business activities.
        </div>
        <div className='mt-50 ml-1'>
          7.4. Hereby User warrant that the one will not use the Mobavenue Services for any purposes that violate any applicable laws or rights of any third parties, including its intellectual property.
        </div>
        <div className='mt-50 ml-1'>
          7.5. Users will bear full responsibility if their actions are deemed illegal in any jurisdiction.
        </div>
        <div className='mt-1'>
          <strong>8. Remedies</strong>
        </div>
        <div className='mt-50 ml-1'>
          In addition to any other rights and remedies available to us under this Agreement Mobavenue reserves the right to delete any actions submitted through your Links and withhold and freeze any unpaid Commissions or charge back paid Commissions to your account if
        </div>
        <div className='mt-25 ml-3'>
          1. Mobavenue determines that you have violated this Agreement,
        </div>
        <div className='mt-25 ml-3'>
          2. Mobavenue receives any complaints about your participation in the any act which Mobavenue reasonably believes to violate this Agreement or
        </div>
        <div className='mt-25 ml-3'>
          3. Any Qualified Action is later determined to have not met the requirements set forth in this Agreement. Such withholding or freezing of Commissions, or charge backs for paid Commissions, shall be without regard as to whether or not such Commissions were earned as a r esult of such breach. In the event of a material breach of this Agreement, Mobavenue reserves the right to disclose your identity and contact information to appropriate law enforcement or regulatory authorities or any third party that has been directly damaged by your actions.
        </div>
        <div className='mt-1'>
          <strong>9. Fraud</strong>
        </div>
        <div className='mt-50 ml-1'>
          You hereby expressively prohibited to act or use any person, material, equipment, equipment or arrangement for fraud to cause breach of any applicable law, relationship or other information or reference in connection with your access to the Affiliate Programme.
        </div>
        <div className='mt-50 ml-1'>
          Such acts include, but are in no way limited to, using automated means to increase the number of clicks through the Links or completion of any required information, using spyware, using stealware, cookie-stuffing and other deceptive acts or click-fraud. Mobavenue shall make all determinations about fraudulent activity in its sole discretion.
        </div>
        <div className='mt-1'>
          <strong>10. Intellectual Property</strong>
        </div>
        <div className='mt-50 ml-1'>
          10.1. The content on the Service and available through the Service, excluding Advertisements and third party content, but including other text, graphical images, photographs, music, video, software, databases, scripts and trademarks, service marks and logos contained therein (collectively “Proprietary Materials”), are owned by and/or licensed to Mobavenue. All Proprietary Materials are subject to copyright, trademark, trade secret, and/or other rights under the laws of applicable jurisdictions, including domestic laws, foreign laws, and international conventions. Mobavenue reserve all our rights over our Proprietary Materials.
        </div>
        <div className='mt-50 ml-1'>
          10.2. Except as otherwise explicitly permitted, the Users agree not to copy, modify, publish, transmit, distribute, participate in the transfer or sale of, create derivative works of, or in any other way exploit, in whole or in part, any Mobavenue content.
        </div>
        <div className='mt-1'>
          <strong>11. Disclaimer of Warranties and Limitation of Liabilities</strong>
        </div>
        <div className='mt-50 ml-1'>
          11.1. You agree that your use of the Mobavenue Services is at your sole and exclusive risk. The Mobavenue Services is provided “as-is” and without any warranty or condition, express, implied or statutory.
        </div>
        <div className='mt-50 ml-1'>
          11.2. Under no circumstances shall we be liable for direct, indirect incidental, special, consequential or exemplary damages (even if we have been advised of the possibility of such damages), including loss of revenue or anticipated profits or lost business, resulting from any aspect of your use of the service, whether, without limitation, such damages arise from
        </div>
        <div className='mt-25 ml-3'>
          (i) Your use, misuse or inability to use the Mobavenue services.
        </div>
        <div className='mt-25 ml-3'>
          (ii) Your reliance on any content on the service.
        </div>
        <div className='mt-25 ml-3'>
          (iii) The interruption, suspension, modification, alteration or complete discontinuance of the Mobavenue services.
        </div>
        <div className='mt-25 ml-3'>
          (iv) The termination of the Mobavenue services by us, or
        </div>
        <div className='mt-25 ml-3'>
          (v) The temporary or permanent shutdown of your property or other properties participating in the Mobavenue services. The foregoing shall apply regardless of the negligence or other fault of either party and regardless of whether such liability sounds in contract, negligence, tort or any other theory of liability. These limitations also apply with respect to damages incurred by reason of other Mobavenue services or products received or advertised in connection with the Mobavenue services.
        </div>
        <div className='mt-1'>
          <strong>12. Confidentiality</strong>
        </div>
        <div className='mt-50 ml-1'>
          12.1. Each party agrees that it will not disclose any Confidential Information of the other party to any third-party, and that it will not use Confidential Information for any purpose not permitted under this Terms of Use. Each party will protect the Confidential Information of the other party in the same manner that it protects its own confidential and proprietary information, but in no event shall such protection be less than a reasonable standard of care.
        </div>
        <div className='mt-50 ml-1'>
          12.2. The Parties agree that if disclosure is made to their professional advisors, auditors or bankers this shall be done subject to each Party procuring each such recipient’s agreement to keep such information confidential to the same extent as if such recipient were Party to this agreement.
        </div>
        <div className='mt-50 ml-1'>
          12.3. The foregoing obligations shall not apply to the extent Confidential Information of a disclosing party: (a) must be disclosed by the receiving party to comply with any requirement of law or order of a court or administrative body including any applicable stock exchange (provided that each party agrees to the extent legally permissible to notify the other party upon the issuance of any such order, and to cooperate in its efforts to convince the court or administrative body to restrict disclosure); or (b) is known to or in the possession of the receiving party prior to the disclosure of such Confidential Information by the disclosing party, as evidenced by the receiving party’s written records; or (c) is known or generally available to the public through no act or omission of the receiving party; or (d) is made available free of any legal restriction to the receiving party by a third party; or (e) is independently developed by the receiving party without use of any Confidential Information.
        </div>
        <div className='mt-1'>
          <strong>13. Governing Law</strong>
        </div>
        <div className='mt-50 ml-1'>
          13.1. This Agreement and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the law of India. The courts of Mumbai, India shall have exclusive jurisdiction, to the exclusion of any other court.
        </div>
        <div className='mt-1'>
          <strong>14. Independent investigation</strong>
        </div>
        <div className='mt-50 ml-1'>
          You acknowledge that you have read this agreement and agree to all its terms and conditions. You have independently evaluated the desirability of being a part of this agreement in such way that you are abide by the all the terms and each objects mentioned in this agreement and are not relying on any representation, guarantee or statement other than as set forth in this agreement.
        </div>
        <div className='mt-1'>
          <strong>15. Contact</strong>
        </div>
        <div className='mt-50 ml-1'>
          Please note that all communications (including formal notices) under this Agreement are to be sent and received by email. For this purpose, your notices should be sent via email to <a href="mailto:contact@mobavenue.com">contact@mobavenue.com</a>, and we will send our notices to you at the email address you notify to use when you register as an Account Holder, as changed subsequently in your Account details.
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}