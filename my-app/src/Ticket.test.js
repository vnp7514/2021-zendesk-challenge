import { fireEvent, render, screen } from '@testing-library/react';
import Ticket from './Ticket';

const ticket = {
    "url": "https://zccvnp7514.zendesk.com/api/v2/tickets/1.json",
    "id": 1,
    "external_id": null,
    "via": {
        "channel": "sample_ticket",
        "source": {
            "from": {},
            "to": {},
            "rel": null
        }
    },
    "created_at": "2021-11-28T21:04:23Z",
    "updated_at": "2021-11-28T21:04:23Z",
    "type": "incident",
    "subject": "Sample ticket: Meet the ticket",
    "raw_subject": "Sample ticket: Meet the ticket",
    "description": "Hi there,\n\nI’m sending an email because I’m having a problem setting up your new product. Can you help me troubleshoot?\n\nThanks,\n The Customer\n\n",
    "priority": "normal",
    "status": "open",
    "recipient": null,
    "requester_id": 1902362971284,
    "submitter_id": 1267154019450,
    "assignee_id": 1267154019450,
    "organization_id": null,
    "group_id": 4411403643931,
    "collaborator_ids": [],
    "follower_ids": [],
    "email_cc_ids": [],
    "forum_topic_id": null,
    "problem_id": null,
    "has_incidents": false,
    "is_public": true,
    "due_at": null,
    "tags": [
        "sample",
        "support",
        "zendesk"
    ],
    "custom_fields": [],
    "satisfaction_rating": null,
    "sharing_agreement_ids": [],
    "fields": [],
    "followup_ids": [],
    "ticket_form_id": 1900004276604,
    "brand_id": 1900001352684,
    "allow_channelback": false,
    "allow_attachments": true
};

test('Render ticket component correctly', () => {
    const {container} = render(<Ticket ticket={ticket}/>);
    expect(container).toMatchSnapshot();
});

test('When more information button is clicked, the whole JSON is shown', () => {
    const {container, getByTestId} = render(<Ticket ticket={ticket} />);
    const button = getByTestId("ticket");
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
});