from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def log_event(
    db: Session,
    event: str
):

    print("AUDIT LOG:", event)

    audit = AuditLog(
        event=event
    )

    db.add(audit)
    db.commit()