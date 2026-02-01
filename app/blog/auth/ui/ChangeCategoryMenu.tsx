"use client";

import { cn } from "@/app/_lib/helper";
import { ChangeCategoryMenuTrans } from "@/app/_lib/translation";
import { ActionButton, P } from "@/app/_ui";
import { setNotification } from "@/app/u/auth/_lib/setNotification";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { updatePostCategory } from "../../post/_lib/action";
import { CATEGORY_MAP, CategoryId } from "../../post/_lib/category";
const t = ChangeCategoryMenuTrans;

type Props = {
  isRTL: boolean;
  postId: number;
  categoryId: CategoryId;
};

const ChangeCategoryMenu = ({
  isRTL,
  postId,
  categoryId: initialCategoryId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<CategoryId>(initialCategoryId);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [state, formAction, isPending] = useActionState(
    updatePostCategory,
    undefined,
  );

  // useEffect(() => {
  //   setCategoryId(initialCategoryId);
  //   setSavedCategoryId(initialCategoryId)
  // }, [initialCategoryId]);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onkeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onkeyDown);
    return () => {
      document.removeEventListener("keydown", onkeyDown);
      document.removeEventListener("mousedown", onDocMouseDown);
    };
  }, []);

  // notify after save
  useEffect(() => {
    if (!state) return;
    if (state.ok) {
      setOpen(false);
      setCategoryId(state.newCategoryId as CategoryId);
      setNotification(state.message ?? "Saved.");
    } else if (state.message) {
      setNotification(state.message);
    }
  }, [state]);

  const isDirty = useMemo(
    () => categoryId !== initialCategoryId,
    [categoryId, initialCategoryId],
  );

  const currentLabel = isRTL
    ? CATEGORY_MAP[categoryId].rtl
    : CATEGORY_MAP[categoryId].en;

  return (
    <div ref={rootRef} className="relative inline-block">
      {/* clickable chip */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "rounded-full bg-hca-yellow-dark/15 text-hca-blue-dark ring-1 px-3 ring-hca-blue-dark/40 cursor-pointer select-none hover:bg-hca-yellow-dark/25 active:scale-[0.97] transition ",
        )}
        dir={isRTL ? "rtl" : "ltr"}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <P size="sm"> {currentLabel}</P>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Change category"
          className={cn(
            "absolute z-40 mt-2 w-84 rounded-xl border border-white/10 bg-hca-blue-main shadow-lg",
            isRTL ? "left-0" : "right-0",
          )}
        >
          <div className="p-3">
            <P
              className="text-gray-100 font-semibold"
              dir={isRTL ? "rtl" : "ltr"}
              size="sm"
            >
              {isRTL ? t.changeCategory.rtl : t.changeCategory.en}
            </P>

            {/* select */}
            <div className="mt-2">
              <label htmlFor="sr-only">
                {isRTL ? t.category.rtl : t.category.en}
              </label>
              <ul
                role="listbox"
                aria-label={isRTL ? t.category.rtl : t.category.en}
                className={cn(
                  "max-h-56 overflow-auto rounded-md border border-white/10",
                  "bg-white/5 py-1 text-sm",
                )}
                dir={isRTL ? "rtl" : "ltr"}
              >
                {(Object.keys(CATEGORY_MAP) as unknown as CategoryId[]).map(
                  (id) => {
                    const isActive = id === categoryId;

                    return (
                      <li key={id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setCategoryId(id);
                          }}
                          className={cn(
                            "flex w-full items-center px-3 py-2 text-left transition",
                            isRTL && "text-right",
                            isActive
                              ? "bg-hca-yellow-dark text-hca-yellow-main"
                              : "text-gray-100 hover:bg-white/10",
                          )}
                        >
                          {isRTL ? CATEGORY_MAP[id].rtl : CATEGORY_MAP[id].en}
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          </div>

          {/* Action only when dirty */}
          {/* TODO: right everhying working as epxepected I only want hide this section after a successfull form action. so, I always trying to create less state, for clarity */}
          {isDirty && (
            <div
              className={cn(
                "mt-3 items-center gap-2",
                isRTL && "flex-row-reverse",
              )}
            >
              <form action={formAction}>
                <input type="hidden" name="postId" value={postId} />
                <input type="hidden" name="newCategoryId" value={categoryId} />
                <ActionButton disabled={isPending} size="sm" fullWidth>
                  {isPending
                    ? isRTL
                      ? t.action.Saving.rtl
                      : t.action.Saving.en
                    : isRTL
                      ? t.action.SaveChange.rtl
                      : t.action.SaveChange.en}
                </ActionButton>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeCategoryMenu;
